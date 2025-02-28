import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/db';

import GoogleProvider from 'next-auth/providers/google';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
		NaverProvider({
			clientId: process.env.NAVER_CLIENT_ID || "",
			clientSecret: process.env.NAVER_CLIENT_SECRET || "",
		}),
		KakaoProvider({
			clientId: process.env.KAKAO_CLIENT_ID || "",
			clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
		}),
	],	
	callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
    jwt: async ({ user, token }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
	},
	pages: {
		signIn: "/auth/login",
	},
	session: {
		strategy: "jwt" as const,
		maxAge: 60 * 60 * 24, // 하루동안 세션 보관
		updateAge: 60 * 60 * 2, // 2시간 마다 세션 업데이트
	},
	secret: process.env.NEXTAUTH_SECRET, 
};

export default NextAuth(authOptions);