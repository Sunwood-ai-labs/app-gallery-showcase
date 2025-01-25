import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { SearchFilter } from '@/components/search/SearchFilter';
import { SpaceGrid } from '@/components/spaces/SpaceGrid';
import { Space, demoSpaces } from '@/types/space';

const filterAndSortSpaces = (
  spaces: Space[],
  searchTerm: string,
  sortBy: string
): Space[] => {
  return spaces
    .filter((space) =>
      space.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      space.author.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return a.daysAgo - b.daysAgo;
        case 'likes':
          return b.likes - a.likes;
        default: // trending
          const getScore = (space: Space) => (space.likes / (space.daysAgo + 1));
          return getScore(b) - getScore(a);
      }
    });
};

const Spaces: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('trending');

  const filteredAndSortedSpaces = filterAndSortSpaces(demoSpaces, searchTerm, sortBy);

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
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <SpaceGrid
          spaces={filteredAndSortedSpaces}
          title={
            sortBy === 'trending' ? '⭐ Trending Spaces' :
            sortBy === 'latest' ? '🆕 Latest Spaces' :
            '❤️ Most Liked Spaces'
          }
        />
      </main>
    </div>
  );
};

export default Spaces;
