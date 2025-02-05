import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';
import { useSession } from 'next-auth/react';

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
  const router = useRouter();
  const { data: session } = useSession();

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>スペース分析 - App Gallery Showcase v0.3</title>
        <meta name="description" content="スペースの利用状況と統計を分析" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <span role="img" aria-label="analytics">📊</span> スペース分析
          </h1>
        </div>

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
  return {
    props: {},
  };
};
