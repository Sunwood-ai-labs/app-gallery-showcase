import { siteConfig } from '@/config/site';
import localFont from 'next/font/local';
import { Inter, Noto_Sans_JP } from 'next/font/google';

// デフォルトフォントの設定
export const defaultFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-sans',
});

// 日本語フォントの設定
export const japaneseFont = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  preload: true,
  variable: '--font-japanese',
});

// フォントユーティリティ
export const fonts = {
  getGoogleFontUrl: (fontName: string, weights: string[] = ['400', '500', '700']) => {
    const formattedName = fontName.replace(/\s+/g, '+');
    const weightString = weights.join(';');
    return `https://fonts.googleapis.com/css2?family=${formattedName}:wght@${weightString}&display=swap`;
  },

  // フォントファミリー文字列の生成
  getFontFamilyString: () => {
    const primaryFont = siteConfig.font.name;
    return `"${primaryFont}", ${defaultFont.style.fontFamily}, ${japaneseFont.style.fontFamily}, sans-serif`;
  },

  // CSSカスタムプロパティの生成
  getCssVariables: () => {
    return {
      '--font-primary': siteConfig.font.name,
      '--font-sans': defaultFont.style.fontFamily,
      '--font-japanese': japaneseFont.style.fontFamily,
    };
  }
};
