import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import SpaceCard from '../components/SpaceCard';
import { useState, useEffect } from 'react';

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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Hugging Face Spaces Gallery</title>
        <meta name="description" content="Discover amazing AI apps made by the community!" />
      </Head>

      <header className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <span className="text-2xl">🤗</span> Spaces
          </h1>
          <nav className="flex items-center gap-4">
            <Link href="/" className="text-gray-700 hover:text-[#FF9D00] transition-colors">
              Home
            </Link>
            <Link href="/spaces" className="text-gray-700 hover:text-[#FF9D00] transition-colors">
              Browse Spaces
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-gray-700 hover:text-[#FF9D00] transition-colors mr-2">
            Login
          </Link>
          <Link href="/signup" className="bg-[#FF9D00] text-white px-4 py-2 rounded-lg hover:bg-[#FF8A00] transition-colors mr-2">
            Sign Up
          </Link>
          <Link href="/create-space" className="create-button flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create new Space
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-gray-600 mt-1">Discover amazing AI apps made by the community!</p>
          </div>
          <Link href="/profile" className="create-button flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            My Profile
          </Link>
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
          <Link href="/spaces" className="filter-button">
            Browse all Spaces
          </Link>
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
