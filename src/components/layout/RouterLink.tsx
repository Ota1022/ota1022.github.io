'use client';

import { Link, type LinkProps } from '@mui/material';
import NextLink from 'next/link';

export type RouterLinkProps = Omit<LinkProps<typeof NextLink>, 'component'>;

// MUI's Link rendered through the Next.js client router, so the navigation
// gets the same crossfade as the rest of the site. Server Components cannot
// hand `next/link` to MUI's `component` prop (component references do not
// serialize across the RSC boundary), so the binding happens here instead.
export default function RouterLink(props: RouterLinkProps) {
  return <Link component={NextLink} {...props} />;
}
