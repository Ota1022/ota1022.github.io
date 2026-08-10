/**
 * Shared between the render-blocking color scheme script in `layout.tsx` and
 * the MUI CSS vars provider in `providers.tsx`. Both must agree, otherwise the
 * pre-hydration script would apply a different scheme than the provider.
 */
export const MODE_STORAGE_KEY = 'themeMode';
export const COLOR_SCHEME_ATTRIBUTE = 'data-mui-color-scheme';
export const DEFAULT_MODE = 'system';
