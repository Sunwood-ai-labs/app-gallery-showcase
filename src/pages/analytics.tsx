import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';

interface AnalyticsData {
  totalSpaces: number;
  totalClicks: number;
  spacesByCategory: { category: string; count: number }[];
  spacesByRuntime: { runtime: string; count: number }[];
  dailyClicks: { date: string; count: number }[];
  topSpaces: {
    id: string;
    title: string;
    author: string;
    clicks: number;
  }[];
  recentActivity: {
    id: string;
    spaceTitle: string;
    author: string;
    timestamp: string;
  }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/spaces/analytics');
        if (!response.ok) {
          throw new Error('データの取得に失敗しました');
        }
        const analyticsData = await response.json();
        setData(analyticsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>スペース分析 - Hugging Face Spaces</title>
        <meta name="description" content="スペースの利用状況と統計を分析" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <span role="img" aria-label="analytics">📊</span> スペース分析
          </h1>
        </div>

        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9D00]"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {data && <AnalyticsDashboard data={data} />}
      </div>
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

  return {
    props: {},
  };
};
