import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

const CreateSpace: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [url, setUrl] = useState('');
  const [runtime, setRuntime] = useState('ZENO');
  const [category, setCategory] = useState('Audio');
  const [gradient, setGradient] = useState('custom'); // カスタムグラデーションをデフォルトに
  const [startColor, setStartColor] = useState('#6366f1'); // インディゴをデフォルトに
  const [endColor, setEndColor] = useState('#ec4899'); // ピンクをデフォルトに
  
  // プリセットグラデーション
  const gradientPresets = [
    { name: 'カスタム', value: 'custom' },
    { name: 'パープルサンセット', value: 'from-purple-600 to-pink-500' },
    { name: 'オーシャンブリーズ', value: 'from-blue-500 to-teal-400' },
    { name: 'フレイムフレア', value: 'from-red-500 to-orange-400' },
    { name: 'フォレストミスト', value: 'from-green-500 to-teal-400' },
    { name: 'ミッドナイトドリーム', value: 'from-indigo-500 to-purple-500' },
    { name: 'サニーデライト', value: 'from-yellow-400 to-orange-500' },
    { name: 'ノーザンライト', value: 'from-green-400 to-blue-500' },
    { name: 'ベリーブラスト', value: 'from-pink-500 to-rose-500' },
    { name: 'サイバーパンク', value: 'from-violet-600 to-yellow-400' },
    { name: 'トロピカルパラダイス', value: 'from-emerald-400 to-cyan-400' },
  ];

  // グラデーションの値を取得
  const getGradientValue = () => {
    if (gradient === 'custom') {
      // カスタムグラデーションの場合、選択された色を使用
      return `from-[${startColor}] to-[${endColor}]`;
    }
    // プリセットの場合、そのまま返す
    return gradient;
  };

  // グラデーションのプレビュースタイル
  const getPreviewStyle = () => {
    if (gradient === 'custom') {
      return {
        background: `linear-gradient(to right, ${startColor}, ${endColor})`
      };
    }
    // Tailwindのグラデーションクラスをインラインスタイルに変換
    const [fromColor, toColor] = gradient.split(' ');
    return {
      background: `linear-gradient(to right, var(--${fromColor.replace('from-', '')}), var(--${toColor.replace('to-', '')}))`
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/spaces/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          subtitle,
          url,
          runtime,
          category,
          gradient: getGradientValue(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'スペースの作成に失敗しました');
      }

      toast.success('スペースが作成されました');
      router.push('/');
    } catch (error: any) {
      toast.error('エラーが発生しました', {
        description: error.message
      });
    }
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              グラデーション
            </label>
            <div className="space-y-4">
              <select
                value={gradient}
                onChange={(e) => setGradient(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9D00]"
              >
                {gradientPresets.map((preset) => (
                  <option key={preset.value} value={preset.value}>
                    {preset.name}
                  </option>
                ))}
              </select>

              {gradient === 'custom' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      開始色
                    </label>
                    <input
                      type="color"
                      value={startColor}
                      onChange={(e) => setStartColor(e.target.value)}
                      className="w-full h-10 p-1 rounded cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      終了色
                    </label>
                    <input
                      type="color"
                      value={endColor}
                      onChange={(e) => setEndColor(e.target.value)}
                      className="w-full h-10 p-1 rounded cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* グラデーションプレビュー */}
              <div className="w-full h-16 rounded-lg shadow-inner" style={getPreviewStyle()} />
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
