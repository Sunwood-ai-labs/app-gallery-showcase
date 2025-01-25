import { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const SpaceCard = dynamic(() => import('../components/SpaceCard'), { 
  ssr: true,
  loading: () => <div>Loading...</div>
});

const demoSpaces = [
  {
    title: 'Kokoro TTS',
    subtitle: '日本語音声合成エンジン',
    url: 'https://huggingface.co/spaces/hexgrad/kokoro-tts',
    author: {
      name: 'hexgrad',
      username: 'hexgrad',
      image: 'https://avatars.githubusercontent.com/u/example1'
    },
    likes: 1220,
    daysAgo: 5,
    runtime: 'ZENO',
    category: 'Audio'
  },
  {
    title: 'TransPixar',
    subtitle: 'ピクサー風画像変換AI',
    url: 'https://huggingface.co/spaces/wilkemang/transpixar',
    author: {
      name: 'wilkemang',
      username: 'wilkemang',
      image: 'https://avatars.githubusercontent.com/u/example2'
    },
    likes: 874,
    daysAgo: 12,
    runtime: 'ZENO',
    category: 'Image'
  },
  {
    title: 'FitDIT',
    subtitle: 'AIフィットネスコーチ',
    url: 'https://huggingface.co/spaces/BoyuanJiang/fitdit',
    author: {
      name: 'BoyuanJiang',
      username: 'BoyuanJiang',
      image: 'https://avatars.githubusercontent.com/u/example3'
    },
    likes: 125,
    daysAgo: 3,
    runtime: 'ZENO',
    category: 'ML'
  },
  {
    title: 'VITPose Transformers',
    subtitle: '高精度ポーズ推定',
    url: 'https://huggingface.co/spaces/hysts/vitpose',
    author: {
      name: 'hysts',
      username: 'hysts',
      image: 'https://avatars.githubusercontent.com/u/example4'
    },
    likes: 68,
    daysAgo: 2,
    runtime: 'ZENO',
    category: 'ML'
  }
];

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('trending');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter and sort spaces
  const filteredAndSortedSpaces = demoSpaces
    .filter(space => {
      const matchesSearch = 
        space.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        space.author.username.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || space.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return a.daysAgo - b.daysAgo;
        case 'likes':
          return b.likes - a.likes;
        case 'trending':
          // Calculate trend score based on likes and recency
          const getScore = (space: typeof demoSpaces[0]) => 
            (space.likes / (space.daysAgo + 1));
          return getScore(b) - getScore(a);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Hugging Face Spaces Gallery</title>
        <meta name="description" content="Discover amazing AI apps made by the community!" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        {/* Search and Sort */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search spaces by name, author, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm shadow-sm transition-all duration-300 ease-in-out hover:border-primary-500"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="relative flex-shrink-0">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none w-full px-4 py-3 text-sm text-gray-700 bg-white border-2 border-gray-300 rounded-full hover:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 ease-in-out shadow-sm pr-10"
            >
              <option value="trending">Trending</option>
              <option value="latest">Latest</option>
              <option value="likes">Most Liked</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['all', 'Audio', 'Image', 'ML'].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>

        {/* Spaces Grid */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-semibold">
              {sortBy === 'trending' && '⭐ Trending Spaces'}
              {sortBy === 'latest' && '🆕 Latest Spaces'}
              {sortBy === 'likes' && '❤️ Most Liked Spaces'}
            </h2>
            {sortBy === 'trending' && <span className="text-orange-500">🔥</span>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAndSortedSpaces.map((space, index) => (
              <SpaceCard
                key={index}
                {...space}
                index={index}
              />
            ))}
          </div>

          {filteredAndSortedSpaces.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No spaces found matching your search.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
