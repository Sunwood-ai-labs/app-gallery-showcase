import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { SpaceFormFields } from '@/components/forms/SpaceForm';
import { GradientPicker, getGradientValue } from '@/components/gradients/GradientPicker';

const CreateSpace: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [url, setUrl] = useState('');
  const [runtime, setRuntime] = useState('ZENO');
  const [category, setCategory] = useState('Audio');
  const [gradient, setGradient] = useState('custom');
  const [startColor, setStartColor] = useState('#6366f1');
  const [endColor, setEndColor] = useState('#ec4899');

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
          gradient: getGradientValue(gradient, startColor, endColor),
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
          <SpaceFormFields
            title={title}
            setTitle={setTitle}
            subtitle={subtitle}
            setSubtitle={setSubtitle}
            url={url}
            setUrl={setUrl}
            runtime={runtime}
            setRuntime={setRuntime}
            category={category}
            setCategory={setCategory}
          />

          <GradientPicker
            gradient={gradient}
            setGradient={setGradient}
            startColor={startColor}
            setStartColor={setStartColor}
            endColor={endColor}
            setEndColor={setEndColor}
          />

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
