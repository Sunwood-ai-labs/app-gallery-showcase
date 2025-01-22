import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

// Prevent multiple Prisma Client instances
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, email, password } = req.body;

  // Validation
  if (!username || username.length < 3) {
    return res.status(400).json({ message: 'ユーザー名は3文字以上である必要があります' });
  }

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: '有効なメールアドレスを入力してください' });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({ message: 'パスワードは8文字以上である必要があります' });
  }

  try {
    // Check for existing user
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username },
          { email: email }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: 'このユーザー名は既に使用されています' });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'このメールアドレスは既に登録されています' });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        name: username,
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
      }
    });

    // Return success response
    return res.status(201).json({ 
      message: 'ユーザー登録が完了しました', 
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email,
        name: user.name
      } 
    });
  } catch (err: any) {
    console.error('サインアップエラー:', {
      name: err.name,
      message: err.message,
      code: err.code,
      stack: err.stack,
      fullError: JSON.stringify(err, Object.getOwnPropertyNames(err))
    });

    // More specific error handling
    if (err.code === 'P2002') {
      return res.status(400).json({ message: 'ユーザー名またはメールアドレスは既に使用されています' });
    }

    // Generic error response
    return res.status(500).json({ 
      message: 'サインアップ中に予期せぬエラーが発生しました',
      error: err.message || 'サーバーエラー',
      details: JSON.stringify(err, Object.getOwnPropertyNames(err))
    });
  }
}

// Prevent Prisma Client from being created on every request
export const config = {
  api: {
    bodyParser: true,
  },
};
