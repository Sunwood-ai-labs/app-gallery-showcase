import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';

interface ProfilePageProps {
  user: {
    id: string;
    username: string;
    email: string;
    name: string;
    bio: string;
    image: string;
  };
}

const Profile: React.FC<ProfilePageProps> = ({ user }) => {
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio || '');
  const [email, setEmail] = useState(user.email);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          bio,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'プロフィールの更新に失敗しました');
      }

      // Update local state with server response
      if (data.user) {
        setUsername(data.user.username);
        setBio(data.user.bio || '');
        setEmail(data.user.email);
      }
      
      setIsEditing(false);
    } catch (error: any) {
      console.error('プロフィール更新エラー:', error);
      alert(error.message || 'プロフィールの更新中にエラーが発生しました');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Head>
        <title>プロフィール - Hugging Face Spaces</title>
      </Head>
      
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#FF9D00] to-[#FF8A00] h-32 relative">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden">
                <img 
                  src={user.image || 'https://api.dicebear.com/7.x/adventurer/svg?seed=' + user.username} 
                  alt="プロフィール画像" 
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
                  placeholder="ユーザー名"
                />
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="自己紹介"
                  rows={3}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="メールアドレス"
                />
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleSave}
                    className="bg-[#FF9D00] text-white px-4 py-2 rounded-md hover:bg-[#FF8A00]"
                  >
                    変更を保存
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-800">{username}</h1>
                <p className="text-gray-600 mt-2">{bio || '自己紹介が設定されていません'}</p>
                <p className="text-gray-500 text-sm mt-1">{email}</p>
                
                <div className="mt-6 flex justify-center space-x-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-[#FF9D00] text-white px-4 py-2 rounded-md hover:bg-[#FF8A00]"
                  >
                    プロフィールを編集
                  </button>
                  <Link href="/spaces" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
                    マイスペース
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">最近のアクティビティ</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="text-gray-700">新しいスペースを作成: <Link href="#" className="text-[#FF9D00] hover:underline">Kokoro TTS</Link></p>
              <span className="text-sm text-gray-500">2日前</span>
            </div>
            <div className="border-b pb-4">
              <p className="text-gray-700"><Link href="#" className="text-[#FF9D00] hover:underline">TransPixar</Link> スペースをいいねしました</p>
              <span className="text-sm text-gray-500">5日前</span>
            </div>
            <div>
              <p className="text-gray-700"><Link href="#" className="text-[#FF9D00] hover:underline">@wilkemang</Link> をフォローしました</p>
              <span className="text-sm text-gray-500">1週間前</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        bio: true,
        image: true,
      }
    });

    return {
      props: { 
        user: JSON.parse(JSON.stringify(user)) // Serialize to remove undefined
      }
    };
  } catch (error) {
    console.error('プロフィール取得エラー:', error);
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  } finally {
    await prisma.$disconnect();
  }
};

export default Profile;
