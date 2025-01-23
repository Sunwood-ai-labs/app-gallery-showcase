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
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          return null;
        }

        // Use bcryptjs for password comparison
        const isValidPassword = await bcrypt.compare(
          credentials.password, 
          user.password || ''
        );

        if (!isValidPassword) {
          return null;
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
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  events: {
    async signIn(message) {
      console.log('サインイン:', message);
    },
    async signOut(message) {
      console.log('サインアウト:', message);
    },
    async createUser(message) {
      console.log('ユーザー作成:', message);
    }
  },
  logger: {
    error(code, metadata) {
      console.error('NextAuth Error:', { code, metadata });
    },
    warn(code) {
      console.warn('NextAuth Warning:', code);
    },
    debug(code, metadata) {
      console.debug('NextAuth Debug:', { code, metadata });
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login'
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.bio = token.bio;
        session.user.image = token.image;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.username = user.username;
        token.bio = user.bio;
        token.image = user.image;
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || 'your_super_secret_key'
};

export default NextAuth(authOptions);
