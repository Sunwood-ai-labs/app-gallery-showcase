import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SpaceCard from '../components/SpaceCard';

const allSpaces = [
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
  },
  {
    title: 'AI Image Generator',
    author: 'midjourney',
    likes: 456,
    daysAgo: 15,
    runtime: 'CUDA'
  },
  {
    title: 'Language Translator',
    author: 'nlp_expert',
    likes: 234,
    daysAgo: 8,
    runtime: 'TPU'
  },
  {
    title: 'Music Composition AI',
    author: 'soundwave',
    likes: 312,
    daysAgo: 20,
    runtime: 'ZENO'
  },
  {
    title: 'Code Completion Tool',
    author: 'codegen',
    likes: 567,
    daysAgo: 10,
    runtime: 'CPU'
  }
];

const Spaces: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('trending');

  const filteredSpaces = allSpaces.filter(space => 
    space.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    space.author.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return a.daysAgo - b.daysAgo;
      case 'likes':
        return b.likes - a.likes;
      default:
        return b.likes - a.likes;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Browse Spaces - Hugging Face</title>
      </Head>

      <header className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <span className="text-2xl">🤗</span> Browse Spaces
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-gray-700 hover:text-[#FF9D00] transition-colors">
            Login
          </Link>
          <Link href="/signup" className="bg-[#FF9D00] text-white px-4 py-2 rounded-lg hover:bg-[#FF8A00] transition-colors">
            Sign Up
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Spaces by name or author"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="trending">Trending</option>
              <option value="latest">Latest</option>
              <option value="likes">Most Liked</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSpaces.map((space, index) => (
            <SpaceCard
              key={index}
              {...space}
              index={index}
            />
          ))}
        </div>

        {filteredSpaces.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No spaces found matching your search.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Spaces;
