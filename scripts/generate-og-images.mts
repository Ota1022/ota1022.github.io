import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import satori from 'satori';
import sharp from 'sharp';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'og');
const FONTS_DIR = path.join(process.cwd(), 'src', 'assets', 'fonts');
const AVATAR_PATH = path.join(process.cwd(), 'src', 'assets', 'images', 'avatar.jpg');

const WIDTH = 1200;
const HEIGHT = 630;

const ACCENT_COLOR = '#3b82f6';
const ACCENT_SECONDARY = '#8b5cf6';

interface Frontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  tags?: string[];
  externalUrl?: string;
}

function buildOgImage(title: string, tags: string[] = [], date?: string, avatarDataUri?: string) {
  const displayTags = tags.slice(0, 4);

  // Background decorative circles
  const circles = [
    { top: -60, right: -40, size: 280, opacity: 0.07 },
    { top: 300, right: 100, size: 180, opacity: 0.05 },
    { top: 400, left: -60, size: 220, opacity: 0.06 },
    { top: -30, left: 200, size: 120, opacity: 0.04 },
  ];

  return {
    type: 'div',
    props: {
      style: {
        width: WIDTH,
        height: HEIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        fontFamily: 'Noto Sans JP, Inconsolata',
        position: 'relative',
        overflow: 'hidden',
      },
      children: [
        // Decorative circles
        ...circles.map((c) => ({
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: c.top,
              ...(c.left !== undefined ? { left: c.left } : {}),
              ...(c.right !== undefined ? { right: c.right } : {}),
              width: c.size,
              height: c.size,
              borderRadius: c.size / 2,
              border: `2px solid rgba(59, 130, 246, ${c.opacity * 3})`,
              backgroundColor: `rgba(59, 130, 246, ${c.opacity})`,
            },
          },
        })),
        // Card
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              width: 1100,
              height: 540,
              backgroundColor: 'rgba(30, 41, 59, 0.95)',
              borderRadius: 24,
              border: '1px solid rgba(148, 163, 184, 0.15)',
              overflow: 'hidden',
            },
            children: [
              // Card top accent gradient bar
              {
                type: 'div',
                props: {
                  style: {
                    width: '100%',
                    height: 6,
                    backgroundImage: `linear-gradient(90deg, ${ACCENT_COLOR}, ${ACCENT_SECONDARY})`,
                  },
                },
              },
              // Card content
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flex: 1,
                    padding: '44px 56px 40px',
                  },
                  children: [
                    // Upper: date + title + tags
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 18,
                        },
                        children: [
                          // Date
                          ...(date
                            ? [
                                {
                                  type: 'div',
                                  props: {
                                    style: {
                                      fontSize: 26,
                                      color: 'rgba(148, 163, 184, 0.8)',
                                      letterSpacing: 1,
                                    },
                                    children: date,
                                  },
                                },
                              ]
                            : []),
                          // Title
                          {
                            type: 'div',
                            props: {
                              style: {
                                fontSize: title.length > 50 ? 52 : title.length > 35 ? 58 : 64,
                                fontWeight: 700,
                                color: '#f1f5f9',
                                lineHeight: 1.3,
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                              },
                              children: title,
                            },
                          },
                          // Tags
                          ...(displayTags.length > 0
                            ? [
                                {
                                  type: 'div',
                                  props: {
                                    style: {
                                      display: 'flex',
                                      flexWrap: 'wrap' as const,
                                      gap: 12,
                                      marginTop: 4,
                                    },
                                    children: displayTags.map((tag) => ({
                                      type: 'div',
                                      props: {
                                        style: {
                                          fontSize: 26,
                                          color: '#93c5fd',
                                          backgroundColor: 'rgba(59, 130, 246, 0.12)',
                                          border: '1px solid rgba(59, 130, 246, 0.25)',
                                          borderRadius: 12,
                                          padding: '6px 20px',
                                        },
                                        children: tag,
                                      },
                                    })),
                                  },
                                },
                              ]
                            : []),
                        ],
                      },
                    },
                    // Footer
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderTop: '1px solid rgba(148, 163, 184, 0.12)',
                          paddingTop: 22,
                        },
                        children: [
                          // Author
                          {
                            type: 'div',
                            props: {
                              style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 16,
                              },
                              children: [
                                // Avatar
                                ...(avatarDataUri
                                  ? [
                                      {
                                        type: 'img',
                                        props: {
                                          src: avatarDataUri,
                                          width: 80,
                                          height: 80,
                                          style: {
                                            width: 80,
                                            height: 80,
                                            borderRadius: 40,
                                            objectFit: 'cover',
                                          },
                                        },
                                      },
                                    ]
                                  : [
                                      {
                                        type: 'div',
                                        props: {
                                          style: {
                                            width: 80,
                                            height: 80,
                                            borderRadius: 40,
                                            backgroundImage: `linear-gradient(135deg, ${ACCENT_COLOR}, ${ACCENT_SECONDARY})`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#ffffff',
                                            fontSize: 24,
                                            fontWeight: 700,
                                          },
                                          children: 'I',
                                        },
                                      },
                                    ]),
                                {
                                  type: 'div',
                                  props: {
                                    style: {
                                      fontSize: 36,
                                      fontWeight: 700,
                                      color: '#e2e8f0',
                                    },
                                    children: 'Itaru OTA',
                                  },
                                },
                              ],
                            },
                          },
                          // Site URL
                          {
                            type: 'div',
                            props: {
                              style: {
                                fontSize: 28,
                                color: 'rgba(148, 163, 184, 0.7)',
                              },
                              children: 'ota1022.github.io',
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function main() {
  // Load fonts
  const inconsolataData = fs.readFileSync(
    path.join(FONTS_DIR, 'Inconsolata-Regular.ttf')
  );
  const notoSansJPData = fs.readFileSync(
    path.join(FONTS_DIR, 'NotoSansJP-Bold.ttf')
  );

  const fonts = [
    {
      name: 'Inconsolata',
      data: inconsolataData.buffer as ArrayBuffer,
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: 'Noto Sans JP',
      data: notoSansJPData.buffer as ArrayBuffer,
      weight: 700 as const,
      style: 'normal' as const,
    },
  ];

  // Load avatar as base64 data URI
  let avatarDataUri: string | undefined;
  if (fs.existsSync(AVATAR_PATH)) {
    const avatarBuf = fs.readFileSync(AVATAR_PATH);
    avatarDataUri = `data:image/jpeg;base64,${avatarBuf.toString('base64')}`;
  }

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Generate default OG image
  console.log('Generating default OG image...');
  const defaultElement = buildOgImage('Itaru OTA — Portfolio & Blog', [], undefined, avatarDataUri);
  const defaultSvg = await satori(defaultElement as React.ReactElement, {
    width: WIDTH,
    height: HEIGHT,
    fonts,
  });
  await sharp(Buffer.from(defaultSvg))
    .png()
    .toFile(path.join(OUTPUT_DIR, 'default.png'));
  console.log('  -> public/og/default.png');

  // Read all blog posts
  if (!fs.existsSync(CONTENT_DIR)) {
    console.log('No blog content directory found. Done.');
    return;
  }

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'));

  let generated = 0;
  let skipped = 0;

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '');
    const fullPath = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(raw);
    const frontmatter = data as Frontmatter;

    // Skip external posts (they don't have their own pages)
    if (frontmatter.externalUrl) {
      skipped++;
      continue;
    }

    const element = buildOgImage(frontmatter.title, frontmatter.tags, frontmatter.date, avatarDataUri);
    const svg = await satori(element as React.ReactElement, {
      width: WIDTH,
      height: HEIGHT,
      fonts,
    });
    await sharp(Buffer.from(svg))
      .png()
      .toFile(path.join(OUTPUT_DIR, `${slug}.png`));

    console.log(`  -> public/og/${slug}.png`);
    generated++;
  }

  console.log(
    `\nDone! Generated ${generated} OG image(s), skipped ${skipped} external post(s).`
  );
}

main().catch((err) => {
  console.error('Failed to generate OG images:', err);
  process.exit(1);
});
