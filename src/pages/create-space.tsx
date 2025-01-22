import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const CreateSpace: React.FC = () => {
  const [spaceName, setSpaceName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [runtime, setRuntime] = useState('ZENO');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement space creation logic
    console.log('Creating space:', { spaceName, description, visibility, runtime });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Create New Space - Hugging Face</title>
      </Head>

      <header className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <span className="text-2xl">🤗</span> Create New Space
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/profile" className="text-gray-700 hover:text-[#FF9D00] transition-colors">
            My Profile
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8 space-y-6">
          <div>
            <label htmlFor="spaceName" className="block text-sm font-medium text-gray-700 mb-2">
              Space Name
            </label>
            <input
              type="text"
              id="spaceName"
              value={spaceName}
              onChange={(e) => setSpaceName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9D00]"
              placeholder="Enter a unique name for your Space"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9D00]"
              placeholder="Describe what your Space does"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="visibility" className="block text-sm font-medium text-gray-700 mb-2">
                Visibility
              </label>
              <select
                id="visibility"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9D00]"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="unlisted">Unlisted</option>
              </select>
            </div>

            <div>
              <label htmlFor="runtime" className="block text-sm font-medium text-gray-700 mb-2">
                Runtime
              </label>
              <select
                id="runtime"
                value={runtime}
                onChange={(e) => setRuntime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9D00]"
              >
                <option value="ZENO">ZENO</option>
                <option value="CUDA">CUDA</option>
                <option value="CPU">CPU</option>
                <option value="TPU">TPU</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="upload" className="block text-sm font-medium text-gray-700 mb-2">
              Upload Files
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Select a file or drag and drop
                  </p>
                </div>
                <input type="file" className="opacity-0" multiple />
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF9D00] hover:bg-[#FF8A00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9D00]"
            >
              Create Space
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateSpace;
