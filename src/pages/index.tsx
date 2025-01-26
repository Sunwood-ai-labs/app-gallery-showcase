import { NextPage } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Space } from '@/types/space';
import { SpaceGrid } from '@/components/spaces/SpaceGrid';

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('trending');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [trendingSpaces, setTrendingSpaces] = useState<Space[]>([]);

  const removeSpace = (id: string) => {
    setSpaces(prevSpaces => prevSpaces.filter(space => space.id !== id));
    setTrendingSpaces(prevSpaces => prevSpaces.filter(space => space.id !== id));
  };

  const handleSpaceUpdate = (id: string, updates: Partial<Space>) => {
    const updateSpaceList = (prevSpaces: Space[]) =>
      prevSpaces.map(space => 
        space.id === id ? { ...space, ...updates } : space
      );
    
    setSpaces(updateSpaceList);
    setTrendingSpaces(updateSpaceList);
  };

  useEffect(() => {
    const fetchSpaces = async () => {
      const response = await fetch('/api/spaces');
      const data = await response.json();
      
      // トレンディングスペースを計算
      const trending = [...data].sort((a, b) => {
        const getScore = (space: Space) => space.clicks; // clicksは既に1週間以内のみ
        return getScore(b) - getScore(a);
      }).slice(0, 4);

      setTrendingSpaces(trending);
      setSpaces(data);
    };

    fetchSpaces();
  }, []);

  const getFilteredAndSortedSpaces = () => {
    return spaces.filter((space: Space) => {
      const matchesSearch =
        space.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        space.author.username.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || space.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a: Space, b: Space) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        case 'likes':
          return b.clicks - a.clicks;
        default: // 'trending'の場合もここで処理
          return b.clicks - a.clicks;
      }
    });
  };

  const filteredAndSortedSpaces = getFilteredAndSortedSpaces();

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

        {/* トレンディングスペース（固定表示） */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-semibold">👀 Trending Spaces</h2>
            <span className="text-orange-500">🔥</span>
          </div>
          <SpaceGrid
            spaces={trendingSpaces}
            title=""
            onSpaceUpdate={handleSpaceUpdate}
            onSpaceDelete={removeSpace}
          />
        </section>

        {/* フィルタリング・ソートされたスペース */}
        <section>
          <h2 className="text-xl font-semibold mb-6">
            {sortBy === 'latest' ? '🆕 Latest Spaces' : 
             sortBy === 'likes' ? '👀 Most Viewed Spaces' : 
             '📚 All Spaces'}
          </h2>
          <SpaceGrid
            spaces={filteredAndSortedSpaces}
            title=""
            onSpaceUpdate={handleSpaceUpdate}
            onSpaceDelete={removeSpace}
          />
        </section>
      </main>
    </div>
  );
};

export default Home;
