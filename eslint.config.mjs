import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  {
    files: ['src/components/blog/MDXComponents.tsx'],
    rules: {
      // MDX images are pre-sized WebP assets in a fully static export.
      '@next/next/no-img-element': 'off',
    },
  },
  globalIgnores(['out/**', '.next/**', 'node_modules/**']),
]);
