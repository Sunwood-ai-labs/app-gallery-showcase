import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';
import { SpaceFormFields } from '@/components/forms/SpaceForm';
import { GradientPicker, getGradientValue } from '@/components/gradients/GradientPicker';
import { toast } from 'sonner';

interface EditSpacePageProps {
  space: {
    id: string;
    title: string;
    subtitle: string;
    url: string;
    repository?: string;
    repoIcon?: string;
    runtime: string;
    category: string;
    gradient?: string;
    authorId: string;
  };
}

export default function EditSpacePage({ space }: EditSpacePageProps) {
  const router = useRouter();
  const [title, setTitle] = useState(space.title);
  const [subtitle, setSubtitle] = useState(space.subtitle);
  const [url, setUrl] = useState(space.url);
  const [repository, setRepository] = useState(space.repository || '');
  const [repoIcon, setRepoIcon] = useState(space.repoIcon || '');
  const [runtime, setRuntime] = useState(space.runtime);
  const [category, setCategory] = useState(space.category);
  const [gradient, setGradient] = useState(space.gradient || 'custom');
  const [startColor, setStartColor] = useState('#6366f1');
  const [endColor, setEndColor] = useState('#ec4899');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/spaces/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: space.id,
          title,
          subtitle,
          repository,
          repoIcon,
          url,
          runtime,
          category,
          gradient: getGradientValue(gradient, startColor, endColor),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'スペースの更新に失敗しました');
      }

      toast.success('スペースが更新されました');
      router.push('/');
    } catch (error: any) {
      toast.error('エラーが発生しました', {
        description: error.message
      });
    }
  };

  const handleDelete = async () => {
    // 削除確認
    const isConfirmed = window.confirm('このスペースを削除してもよろしいですか？\nこの操作は取り消せません。');
    
    if (!isConfirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/spaces/delete?spaceId=${space.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('スペースの削除に失敗しました');
      }

      toast.success('スペースを削除しました');
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
        <title>スペースを編集 - Hugging Face</title>
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <span className="text-2xl">✏️</span> スペースを編集
        </h1>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8 space-y-6">
          <SpaceFormFields
            title={title}
            setTitle={setTitle}
            subtitle={subtitle}
            setSubtitle={setSubtitle}
            repository={repository}
            setRepository={setRepository}
            repoIcon={repoIcon}
            setRepoIcon={setRepoIcon}
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

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              キャンセル
            </button>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                削除
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF9D00] hover:bg-[#FF8A00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9D00]"
              >
                更新
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

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

  const spaceId = context.params?.id;

  if (!spaceId || typeof spaceId !== 'string') {
    return {
      notFound: true,
    };
  }

  const space = await prisma.space.findUnique({
    where: { id: spaceId },
    select: {
      id: true,
      title: true,
      subtitle: true,
      url: true,
      repository: true,
      repoIcon: true,
      runtime: true,
      category: true,
      gradient: true,
      authorId: true,
    },
  });

  if (!space) {
    return {
      notFound: true,
    };
  }

  // スペースの所有者でない場合はアクセス拒否
  if (space.authorId !== session.user.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      space: JSON.parse(JSON.stringify(space)),
    },
  };
};
