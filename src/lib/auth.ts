import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth, { AuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// 型拡張
declare module "next-auth" {
  interface User {
    id: string;
    username?: string | null;
    bio?: string | null;
    image?: string | null;
  }
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string | null;
    bio?: string | null;
    image?: string | null;
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('メールアドレスとパスワードを入力してください');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          throw new Error('ユーザーが見つかりません');
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password, 
          user.password || ''
        );

        if (!isValidPassword) {
          throw new Error('パスワードが正しくありません');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          username: user.username,
          bio: user.bio,
          image: user.image
        };
      }
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30日
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30日
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user) {
        return true;
      }
      return false;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.username = user.username;
        token.bio = user.bio;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email as string;
        session.user.name = token.name;
        session.user.username = token.username as string | null;
        session.user.bio = token.bio as string | null;
        session.user.image = token.image as string | null;
      }
      return session;
    }
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
