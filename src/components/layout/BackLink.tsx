'use client';

import { useRouter } from 'next/navigation';
import type { MouseEvent } from 'react';
import RouterLink, { type RouterLinkProps } from './RouterLink';

type BackLinkProps = Omit<RouterLinkProps, 'href' | 'onClick'> & {
  href: string;
};

// The slice of the Navigation API this component reads. lib.dom does not
// declare `window.navigation` yet, and the API is missing in older browsers.
interface NavigationEntryLike {
  url: string | null;
  index: number;
}
interface NavigationLike {
  currentEntry: NavigationEntryLike | null;
  entries(): NavigationEntryLike[];
}

function previousEntryPathname(): string | null {
  const { navigation } = window as Window & { navigation?: NavigationLike };
  const current = navigation?.currentEntry;
  if (!navigation || !current) {
    return null;
  }
  const previous = navigation.entries()[current.index - 1];
  if (!previous?.url) {
    return null;
  }
  const url = new URL(previous.url);
  return url.origin === window.location.origin ? url.pathname : null;
}

// A "back to X" link. Following an ordinary link to X pushes a new history
// entry, so the reader lands at the top of X. When X is the page they just
// came from, this goes back through history instead, and the browser restores
// their scroll position. Readers who arrived from elsewhere, and browsers
// without the Navigation API, get the ordinary link.
export default function BackLink({ href, ...props }: BackLinkProps) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const isPlainClick =
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey;
    if (!isPlainClick || previousEntryPathname() !== href) {
      return;
    }
    event.preventDefault();
    router.back();
  };

  return <RouterLink href={href} onClick={handleClick} {...props} />;
}
