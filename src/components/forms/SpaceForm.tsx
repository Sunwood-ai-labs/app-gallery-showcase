import React from 'react';

interface SpaceFormFieldsProps {
  title: string;
  setTitle: (value: string) => void;
  subtitle: string;
  setSubtitle: (value: string) => void;
  repository: string;
  setRepository: (value: string) => void;
  repoIcon: string;
  setRepoIcon: (value: string) => void;
  url: string;
  setUrl: (value: string) => void;
  runtime: string;
  setRuntime: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
}

export const SpaceFormFields: React.FC<SpaceFormFieldsProps> = ({
  title,
  setTitle,
  subtitle,
  setSubtitle,
  repository,
  setRepository,
  repoIcon,
  setRepoIcon,
  url,
  setUrl,
  runtime,
  setRuntime,
  category,
  setCategory,
}) => {
  return (
    <>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          スペース名
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9D00]"
          placeholder="スペースの名前を入力してください"
        />
      </div>

      <div>
        <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
          サブタイトル
        </label>
        <input
          type="text"
          id="subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9D00]"
          placeholder="スペースの簡単な説明を入力してください"
        />
      </div>

      <div>
        <label htmlFor="repository" className="block text-sm font-medium text-gray-700 mb-2">
          プロジェクトURL（オプション）<span className="text-sm text-gray-500">GitHubの場合、アバターが自動的に設定されます</span>
        </label>
        <input
          type="url"
          id="repository"
          value={repository}
          onChange={(e) => {
            setRepository(e.target.value);
            // アイコンをリセット
            setRepoIcon('');
            // GitHubの場合のみアイコンを自動生成
            if (e.target.value) {
              try {
                const url = new URL(e.target.value);
                if (url.hostname === 'github.com') {
                  const [owner, repo] = url.pathname.split('/').filter(Boolean);
                  if (owner) setRepoIcon(`https://github.com/${owner}.png`);
                }
              } catch (e) {}
            }
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9D00]"
          placeholder="https://example.com/ または https://github.com/username/repository"
        />
      </div>

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
          URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9D00]"
          placeholder="https://example.com"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            カテゴリー
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9D00]"
          >
            <option value="Audio">Audio</option>
            <option value="Image">Image</option>
            <option value="Text">Text</option>
            <option value="Video">Video</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="runtime" className="block text-sm font-medium text-gray-700 mb-2">
            ランタイム
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
    </>
  );
};
