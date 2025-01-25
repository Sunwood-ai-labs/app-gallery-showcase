import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      username?: string | null;
      bio?: string | null;
      image?: string | null;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
    username?: string | null;
    bio?: string | null;
    image?: string | null;
  }
}
