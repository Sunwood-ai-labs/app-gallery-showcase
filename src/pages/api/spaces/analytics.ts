import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

/**
 * 分析データを取得するAPI
 * このエンドポイントは公開されており、誰でもアクセス可能です
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // 1. 全体の統計
    const totalSpaces = await prisma.space.count({
      where: { visibility: 'public' } // 公開スペースのみカウント
    });
    const totalClicks = await prisma.click.count();

    // 2. カテゴリ別のスペース数（公開スペースのみ）
    const spacesByCategory = await prisma.space.groupBy({
      by: ['category'],
      where: { visibility: 'public' },
      _count: true,
    });

    // 3. ランタイム別のスペース数（公開スペースのみ）
    const spacesByRuntime = await prisma.space.groupBy({
      by: ['runtime'],
      where: { visibility: 'public' },
      _count: true,
    });

    // 4. 過去7日間の日別クリック数
    const dailyClicks = await prisma.click.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: oneWeekAgo,
        },
        space: {
          visibility: 'public'
        }
      },
      _count: true,
    });

    // 5. トップスペース（クリック数順、公開スペースのみ）
    const topSpaces = await prisma.space.findMany({
      take: 5,
      where: { visibility: 'public' },
      include: {
        author: {
          select: {
            username: true,
            name: true,
          },
        },
        _count: {
          select: {
            clicks: true,
          },
        },
      },
      orderBy: {
        clicks: {
          _count: 'desc',
        },
      },
    });

    // 6. 最新のアクティビティ（公開スペースのみ）
    const recentActivity = await prisma.click.findMany({
      take: 10,
      where: {
        space: {
          visibility: 'public'
        }
      },
      include: {
        space: {
          include: {
            author: {
              select: {
                username: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json({
      totalSpaces,
      totalClicks,
      spacesByCategory: spacesByCategory.map(cat => ({
        category: cat.category,
        count: cat._count,
      })),
      spacesByRuntime: spacesByRuntime.map(rt => ({
        runtime: rt.runtime,
        count: rt._count,
      })),
      dailyClicks: dailyClicks.map(dc => ({
        date: dc.createdAt,
        count: dc._count,
      })),
      topSpaces: topSpaces.map(space => ({
        id: space.id,
        title: space.title,
        author: space.author.username || space.author.name,
        clicks: space._count.clicks,
      })),
      recentActivity: recentActivity.map(activity => ({
        id: activity.id,
        spaceTitle: activity.space.title,
        author: activity.space.author.username || activity.space.author.name,
        timestamp: activity.createdAt,
      })),
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return res.status(500).json({ message: 'データの取得中にエラーが発生しました' });
  }
}
