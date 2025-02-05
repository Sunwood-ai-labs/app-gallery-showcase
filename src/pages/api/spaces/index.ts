import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // 1週間前の日付を計算
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const spaces = await prisma.space.findMany({
      where: {
        visibility: 'public', // 公開スペースのみを取得
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        clicks: {
          where: {
            createdAt: { gte: oneWeekAgo }
          }
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // 各スペースのクリック数と作成日からの経過日数を計算
    const spacesWithMetadata = spaces.map(space => ({
      ...space,
      clicks: space.clicks.length,
      daysAgo: Math.floor((Date.now() - new Date(space.createdAt).getTime()) / (1000 * 60 * 60 * 24)),
    }));

    return res.status(200).json(spacesWithMetadata);
  } catch (error) {
    console.error('Error fetching spaces:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
