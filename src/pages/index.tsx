import { NextPage } from 'next';
import Head from 'next/head';
import SpaceCard from '../components/SpaceCard';

const demoSpaces = [
  {
    title: 'Kokoro TTS',
    author: 'hexgrad',
    likes: 1220,
    daysAgo: 5,
    runtime: 'ZENO'
  },
  {
    title: 'TransPixar',
    author: 'wilkemang',
    likes: 874,
    daysAgo: 12,
    runtime: 'ZENO'
  },
  {
    title: 'FitDIT',
    author: 'BoyuanJiang',
    likes: 125,
    daysAgo: 3,
    runtime: 'ZENO'
  },
  {
    title: 'VITPose Transformers',
    author: 'hysts',
    likes: 68,
    daysAgo: 2,
    runtime: 'ZENO'
  }
];

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Hugging Face Spaces Gallery</title>
        <meta name="description" content="Discover amazing AI apps made by the community!" />
      </Head>

      <main className="container">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <span className="text-2xl">🤗</span> Spaces
            </h1>
            <p className="text-gray-600 mt-1">Discover amazing AI apps made by the community!</p>
          </div>
          <button className="create-button">
            Create new Space
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Spaces"
              className="search-input"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="20"
              height="20"
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
          <button className="filter-button">
            Browse all Spaces
          </button>
          <button className="filter-button">
            Full-text search
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort:</span>
            <select className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="trending">Trending</option>
              <option value="latest">Latest</option>
              <option value="likes">Most Liked</option>
            </select>
          </div>
        </div>

        {/* Spaces Grid */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-semibold">⭐ Spaces of the week</h2>
            <span className="text-orange-500">🔥</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {demoSpaces.map((space, index) => (
              <SpaceCard
                key={index}
                {...space}
                index={index}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
