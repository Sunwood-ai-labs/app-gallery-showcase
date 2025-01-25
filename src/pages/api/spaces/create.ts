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
      return res.status(401).json({ message: 'ログインが必要です' });
    }

    const { title, subtitle, url, runtime, category, gradient } = req.body;

    // Validation
    if (!title || !subtitle || !url || !runtime || !category) {
      return res.status(400).json({ 
        message: '必須項目が入力されていません'
      });
    }

    // URLの形式を検証
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ 
        message: '有効なURLを入力してください'
      });
    }

    // Create space
    const space = await prisma.space.create({
      data: {
        title,
        subtitle,
        url,
        runtime,
        category,
        gradient,
        authorId: session.user.id,
        visibility: 'public'
      }
    });

    return res.status(201).json({ 
      message: 'スペースが作成されました', 
      space
    });

  } catch (err: any) {
    console.error('Space作成エラー:', err);
    return res.status(500).json({ 
      message: 'スペースの作成中にエラーが発生しました',
      error: err.message
    });
  } finally {
    await prisma.$disconnect();
  }
}
