import React, { useState } from 'react';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { prisma } from '@/lib/prisma';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { ProfileInfo, ProfileActivity } from '@/components/profile/ProfileInfo';

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
        <title>プロフィール - App Gallery Showcase v0.3</title>
      </Head>
      
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#FF9D00] to-[#FF8A00] h-32 relative">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden">
                <img 
                  src={user.image || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.username}`}
                  alt="プロフィール画像" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="pt-20 px-6 pb-6 text-center">
            {isEditing ? (
              <ProfileForm
                username={username}
                setUsername={setUsername}
                bio={bio}
                setBio={setBio}
                email={email}
                setEmail={setEmail}
                onSave={handleSave}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <ProfileInfo
                username={username}
                bio={bio}
                email={email}
                image={user.image}
                onEdit={() => setIsEditing(true)}
              />
            )}
          </div>
        </div>
        
        <ProfileActivity />
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

    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    const serializedUser = JSON.parse(JSON.stringify(user));

    if (typeof serializedUser.username !== 'string' || typeof serializedUser.email !== 'string') {
      console.error('Invalid user data:', serializedUser);
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    return {
      props: { 
        user: serializedUser
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
  }
};

export default Profile;
