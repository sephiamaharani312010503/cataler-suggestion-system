import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "@/service/firebase/authServices";
import { compare } from "bcrypt";

const authOption = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        nik: { label: "nik", type: "nik" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { nik, password } = credentials;
        const user = await signIn(nik);
        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user;
          }
          return null;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "credentials") {
        (token.id = user.id),
          (token.nik = user.nik),
          (token.name = user.name),
          (token.role = user.role);
        token.jabatan = user.jabatan;
        token.departemen = user.departemen;
      }
      return token;
    },
    async session({ session, token }) {
      if ("id" in token) {
        session.user.id = token.id;
      }
      if ("nik" in token) {
        session.user.nik = token.nik;
      }
      if ("name" in token) {
        session.user.name = token.name;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      if ("jabatan" in token) {
        session.user.jabatan = token.jabatan;
      }
      if ("departemen" in token) {
        session.user.departemen = token.departemen;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOption);
