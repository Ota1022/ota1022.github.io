'use client';

import { Link, type LinkProps } from '@mui/material';
import type { MouseEvent } from 'react';

type TocLinkProps = Omit<LinkProps, 'href' | 'onClick'> & {
  /** Fragment link to a heading on the current page, e.g. `#overview`. */
  href: string;
};

// In-page link that glides to its heading. `scroll-behavior: smooth` is not set
// globally because the browser would then also animate scroll restoration on
// back navigation, so the smoothness is opted into here, for these links only.
// Modified clicks and unknown targets fall through to the browser's default.
export default function TocLink({ href, ...props }: TocLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const isPlainClick =
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey;
    if (!isPlainClick || !href.startsWith('#')) {
      return;
    }
    const target = document.getElementById(decodeURIComponent(href.slice(1)));
    if (!target) {
      return;
    }
    event.preventDefault();
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    target.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
    window.history.pushState(null, '', href);
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
