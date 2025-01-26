import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { spaceId } = req.query;

    if (!spaceId || typeof spaceId !== 'string') {
      return res.status(400).json({ message: 'Space ID is required' });
    }

    // スペースの存在確認と所有者チェック
    const space = await prisma.space.findUnique({
      where: { id: spaceId },
      select: {
        id: true,
        authorId: true,
      },
    });

    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }

    if (space.authorId !== session.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this space' });
    }

    // スペースの削除
    await prisma.space.delete({
      where: { id: spaceId },
    });

    return res.status(200).json({ message: 'Space deleted successfully' });
  } catch (error) {
    console.error('Error deleting space:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
