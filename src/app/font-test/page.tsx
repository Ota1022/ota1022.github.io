import type { NextPage } from 'next';
import { Inconsolata } from 'next/font/google';
const Inconsolata400 = Inconsolata({ weight: '400', preload: false });

const FontPage: NextPage = () => {
  return <div className={Inconsolata400.className}>Google Inconsolata Font Test</div>;
};

export default FontPage;
