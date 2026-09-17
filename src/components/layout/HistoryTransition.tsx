'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef } from 'react';

// The slice of the Navigation API used below; lib.dom does not declare it yet.
interface NavigateEventLike extends Event {
  readonly navigationType: 'push' | 'replace' | 'reload' | 'traverse';
  readonly canIntercept: boolean;
  readonly hashChange: boolean;
  readonly destination: {
    readonly url: string;
    readonly sameDocument: boolean;
  };
  intercept(options: {
    handler?: () => Promise<void>;
    scroll?: 'after-transition' | 'manual';
  }): void;
  scroll(): void;
}

interface PendingTraversal {
  event: NavigateEventLike;
  settle: () => void;
}

/** Upper bound on waiting for React to commit the traversed-to page. */
const COMMIT_TIMEOUT_MS = 1500;

// Crossfades browser back/forward the same way links crossfade.
//
// Link navigations animate through React's <ViewTransition> in PageShell, but
// Next.js applies a history traversal in a way React does not animate. So for
// traversals the transition is started here, with care for ordering:
//
// 1. `navigate` fires before the traversal is applied. It is intercepted with
//    `scroll: 'manual'` so the browser holds the scroll restoration until asked.
// 2. `popstate` fires next. This listener runs before Next.js's (it is
//    registered first) and stops the event so Next.js does not swap the page
//    before the old one has been snapshotted.
// 3. Inside the view transition's update callback, once the old page is
//    captured, popstate is re-dispatched so Next.js restores the route. When the
//    new page commits (pathname changes), the scroll position is restored and
//    the callback resolves, so the new snapshot shows the restored position.
//
// Browsers without the Navigation API (or with reduced motion) keep the plain,
// instant traversal.
export default function HistoryTransition() {
  const pathname = usePathname();
  const onCommit = useRef<(() => void) | null>(null);

  // Runs once per route commit; the pathname itself is not needed inside.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger, not an input
  useLayoutEffect(() => {
    const commit = onCommit.current;
    onCommit.current = null;
    commit?.();
  }, [pathname]);

  useEffect(() => {
    const { navigation } = window as Window & { navigation?: EventTarget };
    if (!navigation || typeof document.startViewTransition !== 'function') {
      return;
    }

    let pending: PendingTraversal | null = null;
    let redispatching = false;

    const onNavigate = (event: Event) => {
      const navigateEvent = event as NavigateEventLike;
      if (
        navigateEvent.navigationType !== 'traverse' ||
        !navigateEvent.canIntercept ||
        navigateEvent.hashChange ||
        !navigateEvent.destination.sameDocument ||
        new URL(navigateEvent.destination.url).pathname ===
          window.location.pathname ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }
      const done = new Promise<void>((resolve) => {
        pending = { event: navigateEvent, settle: resolve };
        // Never leave the navigation hanging if popstate does not follow.
        window.setTimeout(resolve, COMMIT_TIMEOUT_MS * 2);
      });
      navigateEvent.intercept({ scroll: 'manual', handler: () => done });
    };

    const onPopState = (event: PopStateEvent) => {
      if (redispatching || pending === null) {
        return;
      }
      const { event: navigateEvent, settle } = pending;
      pending = null;
      event.stopImmediatePropagation();

      const transition = document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            const finish = () => {
              window.clearTimeout(timer);
              onCommit.current = null;
              try {
                navigateEvent.scroll();
              } catch {
                // Already restored, or the traversal was superseded.
              }
              resolve();
            };
            const timer = window.setTimeout(finish, COMMIT_TIMEOUT_MS);
            onCommit.current = finish;
            redispatching = true;
            try {
              window.dispatchEvent(
                new PopStateEvent('popstate', { state: event.state })
              );
            } finally {
              redispatching = false;
            }
          })
      );
      transition.updateCallbackDone.then(settle, settle);
      // The browser skips the animation (and rejects these) when the document
      // is hidden; the route still updates, so there is nothing to handle.
      transition.ready.catch(() => {});
      transition.finished.catch(() => {});
    };

    navigation.addEventListener('navigate', onNavigate);
    window.addEventListener('popstate', onPopState);
    return () => {
      navigation.removeEventListener('navigate', onNavigate);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  return null;
}
