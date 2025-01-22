import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: 'ログインが必要です', error: 'Unauthorized' });
    }

    const { username, bio, email } = req.body;

    // Validation
    if (!username || username.length < 3) {
      return res.status(400).json({ 
        message: 'ユーザー名は3文字以上である必要があります',
        error: 'Invalid username'
      });
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ 
        message: '有効なメールアドレスを入力してください',
        error: 'Invalid email'
      });
    }

    // Check if the new username is already taken (excluding current user)
    const existingUser = await prisma.user.findFirst({
      where: {
        AND: [
          { username: username },
          { id: { not: session.user.id } }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'このユーザー名は既に使用されています',
        error: 'Username already exists'
      });
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        username,
        bio: bio || null,
        email,
        name: username  // Update name to match username
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        bio: true,
        image: true
      }
    });

    return res.status(200).json({
      message: 'プロフィールが正常に更新されました',
      user: updatedUser
    });
  } catch (err: any) {
    console.error('プロフィール更新エラー:', {
      name: err.name,
      message: err.message,
      code: err.code,
      stack: err.stack
    });

    // Handle unique constraint violation
    if (err.code === 'P2002') {
      return res.status(400).json({ 
        message: 'ユーザー名またはメールアドレスは既に使用されています',
        error: 'Unique constraint violation'
      });
    }

    return res.status(500).json({ 
      message: 'プロフィールの更新中に予期せぬエラーが発生しました',
      error: err.message || 'Internal server error'
    });
  } finally {
    await prisma.$disconnect();
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
