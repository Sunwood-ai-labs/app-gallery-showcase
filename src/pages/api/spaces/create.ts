import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: 'ログインが必要です' });
    }

    const { title, subtitle, url, runtime, category, gradient, repository, repoIcon } = req.body;

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

    // グラデーションの処理
    const gradientData: {
      gradient: string;
      startColor?: string;
      endColor?: string;
    } = {
      gradient: req.body.gradient
    };

    if (req.body.gradient?.startsWith('from-[')) {
      // カスタムグラデーションの場合
      const startMatch = req.body.gradient.match(/from-\[(.*?)\]/);
      const endMatch = req.body.gradient.match(/to-\[(.*?)\]/);
      
      if (startMatch && endMatch) {
        gradientData.startColor = startMatch[1];
        gradientData.endColor = endMatch[1];
      }
    }

    // リポジトリのアイコン処理（GitHubの場合のみ）
    let calculatedRepoIcon = repoIcon;
    if (repository && repository.includes('github.com')) {
      try {
        const repoUrl = new URL(repository);
        const [owner] = repoUrl.pathname.split('/').filter(Boolean);
        calculatedRepoIcon = `https://github.com/${owner}.png`;
      } catch {}
    }

    // Create space with updated data
    const spaceData = {
      title,
      subtitle,
      url,
      runtime,
      category,
      repository,
      repoIcon: calculatedRepoIcon,
      authorId: session.user.id,
      visibility: 'public'
    };

    const space = await prisma.space.create({
      data: {
        ...spaceData,
        ...gradientData
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
  }
}
