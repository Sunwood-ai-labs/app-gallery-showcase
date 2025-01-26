import React from 'react';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

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

interface AnalyticsDashboardProps {
  data: AnalyticsData;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* 概要統計 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">総スペース数</h3>
          <p className="text-3xl font-bold text-[#FF9D00]">{data.totalSpaces}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">総クリック数</h3>
          <p className="text-3xl font-bold text-[#FF9D00]">{data.totalClicks}</p>
        </div>
      </div>

      {/* カテゴリ別分布 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">カテゴリ別スペース数</h3>
        <div className="space-y-2">
          {data.spacesByCategory.map((category) => (
            <div key={category.category} className="flex items-center justify-between">
              <span className="text-gray-600">{category.category}</span>
              <div className="flex items-center gap-2">
                <div className="h-2 bg-[#FF9D00] rounded-full" 
                     style={{ width: `${(category.count / data.totalSpaces) * 200}px` }} />
                <span className="text-sm text-gray-500">{category.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ランタイム別分布 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">ランタイム別スペース数</h3>
        <div className="space-y-2">
          {data.spacesByRuntime.map((runtime) => (
            <div key={runtime.runtime} className="flex items-center justify-between">
              <span className="text-gray-600">{runtime.runtime}</span>
              <div className="flex items-center gap-2">
                <div className="h-2 bg-[#FF9D00] rounded-full"
                     style={{ width: `${(runtime.count / data.totalSpaces) * 200}px` }} />
                <span className="text-sm text-gray-500">{runtime.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 人気のスペース */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">人気のスペース</h3>
        <div className="space-y-4">
          {data.topSpaces.map((space) => (
            <div key={space.id} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800">{space.title}</h4>
                <p className="text-sm text-gray-500">作成者: {space.author}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm bg-[#FF9D00] text-white px-2 py-1 rounded-full">
                  {space.clicks} クリック
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 最近のアクティビティ */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">最近のアクティビティ</h3>
        <div className="space-y-4">
          {data.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800">{activity.spaceTitle}</h4>
                <p className="text-sm text-gray-500">
                  {activity.author} がアクセス
                </p>
              </div>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
