import { Container } from '@mui/material';
import { type ReactNode, ViewTransition } from 'react';
import Footer from './Footer';
import Header from './Header';

interface PageShellProps {
  children: ReactNode;
}

// Client-side navigations crossfade the whole page; the timing lives in
// globals.css next to the cross-document rule so both paths feel the same.
//
// The boundary has to be the outermost element of the page output. React only
// treats a <ViewTransition> as entering or exiting when its own DOM children
// are the nodes being inserted or removed; it deliberately stops propagating
// that information past host elements, so a boundary nested inside the
// Container would never animate. The header sits inside the boundary as a
// result, and is pinned in place via `view-transition-name` (see Header).
//
// The Container is the same width on every route so the pinned header has
// identical geometry on both sides of a navigation. Pages size their own
// content column inside it.
export default function PageShell({ children }: PageShellProps) {
  return (
    <ViewTransition>
      <Container
        maxWidth="lg"
        sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 1, sm: 2 } }}
      >
        <Header />
        {children}
        <Footer />
      </Container>
    </ViewTransition>
  );
}
