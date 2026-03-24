import { loadFont } from '@remotion/fonts';
import { staticFile } from 'remotion';
import { loadFont as loadGoogleFont } from '@remotion/google-fonts/Inter';

// Load Satoshi Bold (local)
const satoshiPromise = loadFont({
  family: 'Satoshi',
  url: staticFile('fonts/Satoshi-Bold.woff2'),
  weight: '700',
  style: 'normal',
});

// Load Inter (Google Fonts)
const { fontFamily: interFamily } = loadGoogleFont('normal', {
  weights: ['400', '500', '700'],
  subsets: ['latin'],
});

export const fontSatoshi = "'Satoshi', 'Inter', system-ui, sans-serif";
export const fontInter = interFamily;

export const waitForFonts = async () => {
  await satoshiPromise;
};
