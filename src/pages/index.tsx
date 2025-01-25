import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';

const SpaceCard = dynamic(() => import('../components/SpaceCard'), { 
  ssr: true,  // Ensure server-side rendering
  loading: () => <div>Loading...</div>
});

const demoSpaces = [
  {
    title: 'Kokoro TTS',
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

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Hugging Face Spaces Gallery</title>
        <meta name="description" content="Discover amazing AI apps made by the community!" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Spaces by name, author, or tags..."
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
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <button className="text-gray-500 hover:text-primary-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 16v-4.414L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link 
              href="/spaces" 
              className="px-4 py-3 text-sm text-gray-700 bg-white border-2 border-gray-300 rounded-full hover:border-primary-500 hover:text-primary-500 transition-all duration-300 ease-in-out shadow-sm"
            >
              Browse all Spaces
            </Link>
            <div className="relative">
              <select 
                className="appearance-none w-full px-4 py-3 text-sm text-gray-700 bg-white border-2 border-gray-300 rounded-full hover:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 ease-in-out shadow-sm pr-8"
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
