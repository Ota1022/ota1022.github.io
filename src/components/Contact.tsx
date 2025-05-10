'use client';

import CredlyIcon from '@/components/icons/CredlyIcon';
import SpeakerDeckIcon from '@/components/icons/SpeakerDeckIcon';
import ZennIcon from '@/components/icons/ZennIcon';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import { Link } from '@mui/material';

const Contact = (): React.ReactNode => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
      <Link href="https://www.linkedin.com/in/itaru-ota/" color="inherit">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50px',
            height: '50px',
          }}
        >
          <LinkedInIcon style={{ width: '100%', height: '100%' }} />
        </div>
      </Link>
      <Link href="https://github.com/Ota1022" color="inherit">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50px',
            height: '50px',
          }}
        >
          <GitHubIcon style={{ width: '100%', height: '100%' }} />
        </div>
      </Link>
      <Link href="https://x.com/iorandd" color="inherit">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50px',
            height: '50px',
          }}
        >
          <XIcon style={{ width: '100%', height: '100%' }} />
        </div>
      </Link>
      <Link href="https://speakerdeck.com/ota1022" color="inherit">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50px',
            height: '50px',
          }}
        >
          <SpeakerDeckIcon />
        </div>
      </Link>
      <Link href="https://zenn.dev/iorandd" color="inherit">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50px',
            height: '50px',
          }}
        >
          <ZennIcon />
        </div>
      </Link>
      <Link href="https://www.credly.com/users/itaru-ota" color="inherit">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50px',
            height: '50px',
          }}
        >
          <CredlyIcon />
        </div>
      </Link>
    </div>
  );
};

export default Contact;
