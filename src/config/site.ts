export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  font: {
    name: string;
    import: string;
  };
  ogImage: string;
  emoji: string; // ファビコンとして使用する絵文字
}

export const siteConfig: SiteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'App Gallery Showcase v0.3.1',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'プロジェクトを美しく魅力的に紹介するウェブアプリケーション',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  font: {
    name: process.env.NEXT_PUBLIC_FONT_FAMILY || 'Inter',
    import: process.env.NEXT_PUBLIC_FONT_IMPORT || 'Inter:wght@400;500;600;700'
  },
  ogImage: process.env.NEXT_PUBLIC_OG_IMAGE || '/og.png',
  emoji: process.env.NEXT_PUBLIC_SITE_EMOJI || '🎨' // デフォルトの絵文字
}
