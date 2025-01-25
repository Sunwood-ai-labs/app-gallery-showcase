import React from 'react';
import Link from 'next/link';

interface ProfileInfoProps {
  username: string;
  bio: string;
  email: string;
  image: string;
  onEdit: () => void;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  username,
  bio,
  email,
  image,
  onEdit,
}) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800">{username}</h1>
      <p className="text-gray-600 mt-2">{bio || '自己紹介が設定されていません'}</p>
      <p className="text-gray-500 text-sm mt-1">{email}</p>
      
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={onEdit}
          className="bg-[#FF9D00] text-white px-4 py-2 rounded-md hover:bg-[#FF8A00]"
        >
          プロフィールを編集
        </button>
        <Link 
          href="/spaces" 
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          マイスペース
        </Link>
      </div>
    </>
  );
};

export const ProfileActivity: React.FC = () => {
  return (
    <div className="mt-8 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">最近のアクティビティ</h2>
      <div className="space-y-4">
        <div className="border-b pb-4">
          <p className="text-gray-700">
            新しいスペースを作成: {' '}
            <Link href="#" className="text-[#FF9D00] hover:underline">
              Kokoro TTS
            </Link>
          </p>
          <span className="text-sm text-gray-500">2日前</span>
        </div>
        <div className="border-b pb-4">
          <p className="text-gray-700">
            <Link href="#" className="text-[#FF9D00] hover:underline">
              TransPixar
            </Link>{' '}
            スペースをいいねしました
          </p>
          <span className="text-sm text-gray-500">5日前</span>
        </div>
        <div>
          <p className="text-gray-700">
            <Link href="#" className="text-[#FF9D00] hover:underline">
              @wilkemang
            </Link>{' '}
            をフォローしました
          </p>
          <span className="text-sm text-gray-500">1週間前</span>
        </div>
      </div>
    </div>
  );
};
