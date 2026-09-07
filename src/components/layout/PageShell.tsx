import { Container, type ContainerProps } from '@mui/material';
import type { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

interface PageShellProps {
  children: ReactNode;
  maxWidth?: ContainerProps['maxWidth'];
}

export default function PageShell({
  children,
  maxWidth = 'md',
}: PageShellProps) {
  return (
    <Container
      maxWidth={maxWidth}
      sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 1, sm: 2 } }}
    >
      <Header />
      {children}
      <Footer />
    </Container>
  );
}
