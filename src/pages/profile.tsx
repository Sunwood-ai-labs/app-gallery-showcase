import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Profile: React.FC = () => {
  const [username, setUsername] = useState('hexgrad');
  const [bio, setBio] = useState('AI enthusiast and open-source contributor');
  const [email, setEmail] = useState('hexgrad@example.com');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // TODO: Implement save profile logic
    console.log('Saving profile:', { username, bio, email });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Head>
        <title>Profile - Hugging Face Spaces</title>
      </Head>
      
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#FF9D00] to-[#FF8A00] h-32 relative">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden">
                <img 
                  src="https://avatars.githubusercontent.com/u/12345678?v=4" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="pt-20 px-6 pb-6 text-center">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Username"
                />
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Bio"
                  rows={3}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Email"
                />
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleSave}
                    className="bg-[#FF9D00] text-white px-4 py-2 rounded-md hover:bg-[#FF8A00]"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-800">{username}</h1>
                <p className="text-gray-600 mt-2">{bio}</p>
                <p className="text-gray-500 text-sm mt-1">{email}</p>
                
                <div className="mt-6 flex justify-center space-x-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-[#FF9D00] text-white px-4 py-2 rounded-md hover:bg-[#FF8A00]"
                  >
                    Edit Profile
                  </button>
                  <Link href="/spaces" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
                    My Spaces
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="text-gray-700">Created a new Space: <Link href="#" className="text-[#FF9D00] hover:underline">Kokoro TTS</Link></p>
              <span className="text-sm text-gray-500">2 days ago</span>
            </div>
            <div className="border-b pb-4">
              <p className="text-gray-700">Liked <Link href="#" className="text-[#FF9D00] hover:underline">TransPixar</Link> Space</p>
              <span className="text-sm text-gray-500">5 days ago</span>
            </div>
            <div>
              <p className="text-gray-700">Followed <Link href="#" className="text-[#FF9D00] hover:underline">@wilkemang</Link></p>
              <span className="text-sm text-gray-500">1 week ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
