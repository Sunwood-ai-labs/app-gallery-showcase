import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type GetClickCountResponse = {
  clickCount: number;
};

type RecordClickResponse = {
  clickCount: number;
};

type ErrorResponse = {
  message: string;
  error?: string;
};

export default async function handler (
  req: NextApiRequest, 
  res: NextApiResponse<GetClickCountResponse | RecordClickResponse | ErrorResponse>
) {
  try {
    if (req.method === 'GET') {
      const { spaceId } = req.query;

      if (!spaceId || typeof spaceId !== 'string') {
        return res.status(400).json({ message: 'Space ID is required' });
      }

      try {
        const clickCount = await prisma.click.count({
          where: {
            spaceId: spaceId,
          },
        });

        return res.status(200).json({ clickCount });
      } catch (error: any) {
        console.error('Error getting click count:', error);
        return res.status(500).json({ 
          message: 'Error getting click count',
          error: error.message 
        });
      }
    }

    if (req.method === 'POST') {
      const { spaceId } = req.body;

      if (!spaceId) {
        return res.status(400).json({ message: 'Space ID is required' });
      }

      // スペースの存在確認
      const space = await prisma.space.findUnique({
        where: { id: spaceId }
      });

      if (!space) {
        return res.status(404).json({ message: 'Space not found' });
      }

      // クリックを記録
      await prisma.click.create({
        data: {
          spaceId: spaceId,
        },
      });

      // 総クリック数を取得
      const clickCount = await prisma.click.count({
        where: {
          spaceId: spaceId,
        },
      });

      return res.status(200).json({ clickCount });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error: any) {
    console.error('Error recording click:', error);
    return res.status(500).json({ 
      message: 'Error recording click',
      error: error.message 
    });
  }
}
