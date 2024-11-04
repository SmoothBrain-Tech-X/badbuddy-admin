import login from "@/services/login/login.service";
import { Axios, AxiosError } from "axios";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      access_token: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    access_token: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    access_token: string;
    role: string;
  }
}

export const authConfig = {
  trustHost: true,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await login({
            email: credentials.email! as string,
            password: credentials.password! as string,
          });
          if (res.user.role !== "admin") {
            throw new Error("You not have permission to access.");
          }
          return {
            access_token: res.access_token,
            email: res.user.email,
            name: `${res.user.first_name} ${res.user.last_name}`,
            id: res.user.id,
            image: res.user.avatar_url,
            role: res.user.role,
          };
        } catch (error) {
          if (error instanceof AxiosError) {
            return null;
          }
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    session: (session) => {
      session.session.user.access_token = session.token.access_token;
      session.session.user.email = session.token.email ?? "";
      session.session.user.name = session.token.name;
      session.session.user.id = session.token.id;
      session.session.user.role = session.token.role;
      session.session.user.image = session.token.image as string;
      return session.session;
    },
    async jwt({ user, token }) {
      if (user) {
        return {
          access_token: user.access_token,
          email: user.email,
          name: user.name,
          id: user.id,
          image: user.image,
          role: user.role,
        } as JWT;
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
