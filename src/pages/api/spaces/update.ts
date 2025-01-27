import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: 'ログインが必要です' });
    }

    const { id, title, subtitle, url, runtime, category, gradient, repository, repoIcon } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Space ID is required' });
    }

    // スペースの存在確認と所有者チェック
    const existingSpace = await prisma.space.findUnique({
      where: { id },
      select: {
        id: true,
        authorId: true,
      },
    });

    if (!existingSpace) {
      return res.status(404).json({ message: 'Space not found' });
    }

    if (existingSpace.authorId !== session.user.id) {
      return res.status(403).json({ message: '編集権限がありません' });
    }

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
      gradient: gradient
    };

    if (gradient?.startsWith('from-[')) {
      const startMatch = gradient.match(/from-\[(.*?)\]/);
      const endMatch = gradient.match(/to-\[(.*?)\]/);
      
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

    // Update space with new data
    const updatedSpace = await prisma.space.update({
      where: { id },
      data: {
        title,
        subtitle,
        url,
        runtime,
        category,
        repository,
        repoIcon: calculatedRepoIcon,
        ...gradientData
      }
    });

    return res.status(200).json({ 
      message: 'スペースが更新されました', 
      space: updatedSpace
    });
  } catch (err: any) {
    console.error('Space更新エラー:', err);
    return res.status(500).json({ 
      message: 'スペースの更新中にエラーが発生しました',
      error: err.message
    });
  }
}
