export interface Author {
  name: string;
  username: string;
  image: string;
}

export interface Space {
  title: string;
  subtitle: string;
  url: string;
  category: string;
  author: Author;
  likes: number;
  daysAgo: number;
  runtime: string;
}

// デモ用のスペースデータ
export const demoSpaces: Space[] = [
  {
    title: 'Kokoro TTS',
    subtitle: '日本語音声合成エンジン',
    url: 'https://huggingface.co/spaces/hexgrad/kokoro-tts',
    category: 'Audio',
    author: {
      name: 'hexgrad',
      username: 'hexgrad',
      image: 'https://avatars.githubusercontent.com/u/example1'
    },
    likes: 1220,
    daysAgo: 5,
    runtime: 'ZENO'
  },
  {
    title: 'TransPixar',
    subtitle: 'ピクサー風画像変換AI',
    url: 'https://huggingface.co/spaces/wilkemang/transpixar',
    category: 'Image',
    author: {
      name: 'wilkemang',
      username: 'wilkemang',
      image: 'https://avatars.githubusercontent.com/u/example2'
    },
    likes: 874,
    daysAgo: 12,
    runtime: 'ZENO'
  },
  {
    title: 'FitDIT',
    subtitle: 'AIフィットネスコーチ',
    url: 'https://huggingface.co/spaces/BoyuanJiang/fitdit',
    category: 'ML',
    author: {
      name: 'BoyuanJiang',
      username: 'BoyuanJiang',
      image: 'https://avatars.githubusercontent.com/u/example3'
    },
    likes: 125,
    daysAgo: 3,
    runtime: 'ZENO'
  },
  {
    title: 'VITPose Transformers',
    subtitle: '高精度ポーズ推定',
    url: 'https://huggingface.co/spaces/hysts/vitpose',
    category: 'ML',
    author: {
      name: 'hysts',
      username: 'hysts',
      image: 'https://avatars.githubusercontent.com/u/example4'
    },
    likes: 68,
    daysAgo: 2,
    runtime: 'ZENO'
  }
];
