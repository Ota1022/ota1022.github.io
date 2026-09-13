import { Box } from '@mui/material';

interface VideoEmbedProps {
  id: string;
  title: string;
}

interface SpeakerDeckEmbedProps {
  id: string;
  title: string;
}

export function VideoEmbed({ id, title }: VideoEmbedProps) {
  return (
    <Box
      component="figure"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        m: 0,
        my: 3,
      }}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{
          display: 'block',
          width: '100%',
          maxWidth: '56rem',
          aspectRatio: '16 / 9',
          border: 0,
        }}
      />
    </Box>
  );
}

export function SpeakerDeckEmbed({ id, title }: SpeakerDeckEmbedProps) {
  return (
    <Box
      component="figure"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        m: 0,
        my: 3,
      }}
    >
      <iframe
        src={`https://speakerdeck.com/player/${id}`}
        title={title}
        loading="lazy"
        allowFullScreen
        style={{
          display: 'block',
          width: '100%',
          maxWidth: '56rem',
          aspectRatio: '710 / 399',
          border: 0,
          padding: 0,
          margin: 0,
          background: 'transparent',
          clipPath: 'inset(4px)',
        }}
      />
    </Box>
  );
}
