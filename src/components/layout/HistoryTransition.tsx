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
  readonly signal: AbortSignal;
  intercept(options: {
    handler?: () => Promise<void>;
    scroll?: 'after-transition' | 'manual';
  }): void;
  scroll(): void;
}

interface PendingTraversal {
  event: NavigateEventLike;
  /** Lets the intercepted navigation finish. */
  settle: () => void;
}

/** How long the crossfade waits for React to commit the traversed-to page. */
const VISUAL_WAIT_MS = 1500;
/** After this, a traversal that never committed is given up on entirely. */
const ABANDON_MS = 10_000;

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
//    the intercepted navigation finishes, so the new snapshot shows the
//    restored position.
//
// A slow commit ends only the visual wait; scroll restoration still happens
// when the page commits. Browsers without the Navigation API (or with reduced
// motion) keep the plain, instant traversal.
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
      // Any navigation supersedes a traversal still waiting for its popstate,
      // so a later (for example hash-only) popstate is never mistaken for it.
      pending = null;

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

      const traversal: PendingTraversal = {
        event: navigateEvent,
        settle: () => {},
      };
      const done = new Promise<void>((resolve) => {
        traversal.settle = resolve;
      });
      // Never leave the navigation hanging if popstate does not follow.
      const forget = () => {
        if (pending === traversal) {
          pending = null;
        }
        traversal.settle();
      };
      pending = traversal;
      window.setTimeout(forget, ABANDON_MS);
      navigateEvent.intercept({ scroll: 'manual', handler: () => done });
    };

    const onPopState = (event: PopStateEvent) => {
      if (redispatching || pending === null) {
        return;
      }
      const traversal = pending;
      pending = null;
      const { event: navigateEvent } = traversal;
      event.stopImmediatePropagation();

      let endVisualWait: (() => void) | null = null;

      // Stop waiting for this traversal, whichever way it ended.
      const finish = () => {
        window.clearTimeout(abandonTimer);
        if (onCommit.current === commit) {
          onCommit.current = null;
        }
        endVisualWait?.();
        endVisualWait = null;
        traversal.settle();
      };
      // React has committed the traversed-to page: restore the scroll position
      // against the new DOM, then let the navigation finish.
      //
      // The interception's signal is not consulted here. While applying the
      // traversal Next.js calls `history.replaceState`, which the Navigation
      // API reports as aborting the intercepted traversal, yet `scroll()` still
      // restores the position afterwards. Treating that abort as "superseded"
      // would drop the restoration on every back navigation.
      const commit = () => {
        try {
          navigateEvent.scroll();
        } catch {
          // Already restored, or the traversal was genuinely superseded.
        }
        finish();
      };
      const abandonTimer = window.setTimeout(finish, ABANDON_MS);

      const transition = document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            endVisualWait = resolve;
            // A slow commit should not freeze rendering; the page then appears
            // without the crossfade, and the scroll is still restored on commit.
            window.setTimeout(resolve, VISUAL_WAIT_MS);
            onCommit.current = commit;
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
