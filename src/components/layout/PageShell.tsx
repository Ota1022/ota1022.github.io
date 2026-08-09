import { Container } from '@mui/material';
import type { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

interface PageShellProps {
  children: ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Header />
      {children}
      <Footer />
    </Container>
  );
}
