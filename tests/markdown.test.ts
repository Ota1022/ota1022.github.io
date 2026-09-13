import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import matter from 'gray-matter';
import { parseBlogFrontmatter } from '../src/lib/blog-schema';
import {
  calculateReadingTime,
  extractTableOfContents,
  parseMarkdown,
} from '../src/lib/markdown';

const BLOG_DIRECTORY = path.join(process.cwd(), 'content', 'blog');
const EXPECTED_SLUGS = [
  '20250528_qiita-bash-cursor-team-adoption',
  '20250821_jaws-ug-containers-docker-to-ecs',
  '20250925_sre-tech-talk-github-actions-aws-oidc',
  '20251030_trayce-raycast-extension',
  '20260106_aws-ecs-beginner',
  '20260131_aws-how-to-use-terraformer',
  '20260623_meguro-lt-entire-cli',
  '20260625_aws-jr-champions-2026',
  '20260722_jaws-ug-ibaraki-aws-jr-champions',
  '20260804_nw-jaws-ecs-service-connect',
  '20260813_kubecon-cloudnativecon-japan-2026',
  '20260904_rust-opentelemetry-ecs-xray',
  '20260911_jaws-ug-yamanashi-cloudwatch-otel-metrics-promql',
];

test('all posts use Markdown and retain the expected slugs and frontmatter', () => {
  const files = fs.readdirSync(BLOG_DIRECTORY).sort();
  assert.deepEqual(
    files.map((file) => file.replace(/\.md$/, '')),
    EXPECTED_SLUGS
  );
  assert.ok(files.every((file) => file.endsWith('.md')));

  for (const file of files) {
    const { data, content } = matter(
      fs.readFileSync(path.join(BLOG_DIRECTORY, file), 'utf8')
    );
    assert.equal(typeof data.title, 'string');
    assert.equal(typeof data.description, 'string');
    assert.match(String(data.date), /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(typeof data.category, 'string');
    parseMarkdown(content, file);
  }
});

test('frontmatter accepts at most three unique tags', () => {
  const frontmatter = {
    title: 'Post title',
    description: 'Post description',
    date: '2026-09-13',
    category: 'blog',
  };

  assert.doesNotThrow(() =>
    parseBlogFrontmatter(
      { ...frontmatter, tags: ['Rust', 'OpenTelemetry', 'AWS X-Ray'] },
      'valid.md'
    )
  );
  assert.throws(
    () =>
      parseBlogFrontmatter(
        {
          ...frontmatter,
          tags: ['Rust', 'OpenTelemetry', 'AWS X-Ray', 'Amazon ECS'],
        },
        'too-many-tags.md'
      ),
    { message: /must contain at most 3 tags/ }
  );
  assert.throws(
    () =>
      parseBlogFrontmatter(
        { ...frontmatter, tags: ['Rust', 'Rust'] },
        'duplicate-tags.md'
      ),
    { message: /must not contain duplicates/ }
  );
});

test('all four embed directives preserve decoded attribute values', () => {
  const source = [
    '::youtube[A video]{id="JQPfFtRd45A"}',
    '::speakerdeck[A deck]{id="e0d81e214d584ead8ab959c1dea62a43"}',
    '::github{url="https://github.com/openai/openai-node" description="A &quot;quoted&quot; value &amp; more."}',
    '::article[An article]{url="https://example.com/a?x=1&amp;y=2" source="Example" description="Line one. Line two."}',
  ].join('\n\n');
  const tree = parseMarkdown(source, 'embeds.md') as unknown as {
    children: Array<{
      data: { hName: string; hProperties: Record<string, string> };
    }>;
  };

  assert.deepEqual(
    tree.children.map((node) => node.data.hName),
    ['youtube-embed', 'speakerdeck-embed', 'github-repo', 'external-article']
  );
  assert.equal(
    tree.children[2].data.hProperties.description,
    'A "quoted" value & more.'
  );
  assert.equal(
    tree.children[3].data.hProperties.url,
    'https://example.com/a?x=1&y=2'
  );
});

test('invalid embeds and raw HTML report the file and line', () => {
  const invalidSources = [
    '::unknown{x="1"}',
    '::youtube[Title]',
    '::youtube[Title]{id="short"}',
    '::speakerdeck[Title]{id="not-hex"}',
    '::github{url="https://example.com/owner/repo"}',
    '::article[Title]{url="javascript:alert(1)" source="Example" description="No"}',
    '::youtube[Title]{id="JQPfFtRd45A" extra="no"}',
    '<Example />',
  ];

  for (const source of invalidSources) {
    assert.throws(
      () => parseMarkdown(`First line\n\n${source}`, 'invalid.md'),
      {
        message: /^invalid\.md:3:/,
      }
    );
  }
});

test('code examples are not parsed as directives or table-of-contents entries', () => {
  const source = [
    '## Visible heading',
    '',
    '```md',
    '## Hidden heading',
    '::unknown{x="1"}',
    '```',
    '',
    'The event ran from 3:00 p.m. to 4:45 p.m.',
  ].join('\n');

  assert.deepEqual(extractTableOfContents(source, 'code.md'), [
    { id: 'visible-heading', title: 'Visible heading', level: 2 },
  ]);
  assert.equal(calculateReadingTime(source, 'code.md'), 1);
  assert.doesNotThrow(() => parseMarkdown(source, 'code.md'));
});

test('escaped directive punctuation is preserved in image alt text', () => {
  const tree = parseMarkdown(
    '![Collector on localhost\\:4317](/collector.png)',
    'image.md'
  ) as unknown as {
    children: Array<{ children: Array<{ alt: string }> }>;
  };

  assert.equal(tree.children[0].children[0].alt, 'Collector on localhost:4317');
});

test('reading time excludes fenced code, inline code, images, and embeds', () => {
  const prose = Array.from({ length: 201 }, () => 'word').join(' ');
  const excluded = Array.from({ length: 400 }, () => 'code').join(' ');
  const source = `${prose}\n\n\`${excluded}\`\n\n\`\`\`text\n${excluded}\n\`\`\`\n\n![${excluded}](/image.png)\n\n::youtube[${excluded}]{id="JQPfFtRd45A"}`;

  assert.equal(calculateReadingTime(source, 'reading-time.md'), 2);
});
