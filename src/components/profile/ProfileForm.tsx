import React from 'react';

interface ProfileFormProps {
  username: string;
  setUsername: (value: string) => void;
  bio: string;
  setBio: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  username,
  setUsername,
  bio,
  setBio,
  email,
  setEmail,
  onSave,
  onCancel,
}) => {
  return (
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
          onClick={onSave}
          className="bg-[#FF9D00] text-white px-4 py-2 rounded-md hover:bg-[#FF8A00]"
        >
          変更を保存
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          キャンセル
        </button>
      </div>
    </div>
  );
};
