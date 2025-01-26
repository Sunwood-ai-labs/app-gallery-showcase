import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react";
import { useEffect } from 'react';
import Head from 'next/head';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';
import { siteConfig } from '@/config/site';
import { fonts, defaultFont, japaneseFont } from '@/lib/fonts';
import '../globals.css';

// 絵文字ファビコンのSVGを生成
const generateEmojiSvg = (emoji: string) => {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="32" height="32">
      <text x="50" y="50" font-family="system-ui" font-size="80" text-anchor="middle" dominant-baseline="central">
        ${emoji}
      </text>
    </svg>
  `;
};

function MyApp({ 
  Component, 
  pageProps: { session, ...pageProps }
}: AppProps) {
  // フォントとファビコンの設定
  useEffect(() => {
    // Google Fontsの読み込み
    const link = document.createElement('link');
    link.href = fonts.getGoogleFontUrl(siteConfig.font.name);
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // 絵文字ファビコンの設定
    const svg = generateEmojiSvg(siteConfig.emoji);
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = url;
    document.head.appendChild(favicon);

    // クリーンアップ
    return () => {
      document.head.removeChild(link);
      URL.revokeObjectURL(url);
      document.head.removeChild(favicon);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
        <meta property="og:title" content={siteConfig.name} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:image" content={siteConfig.ogImage} />
      </Head>
      
      <SessionProvider session={session}>
        <div 
          className={`${defaultFont.variable} ${japaneseFont.variable} min-h-screen`}
          style={{ 
            fontFamily: fonts.getFontFamilyString(),
            ...fonts.getCssVariables() as React.CSSProperties
          }}
        >
          <Navbar />
          <main className="pt-3"> {/* ナビゲーションバーの下のパディングを調整 */}
            <Component {...pageProps} />
          </main>
          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={3000}
          />
        </div>
      </SessionProvider>
    </>
  );
}

export default MyApp;
