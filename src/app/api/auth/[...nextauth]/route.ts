import { db } from "@/utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        const data: any = [];
        const querySnapshot = await getDocs(collection(db, "admin"));
        querySnapshot.forEach((doc) => data.push(doc.data()));
        if (data[0].username === username) {
          if (data[0].password === password) {
            return {
              username: data[0].username,
              id: "JY18wz3Fw6A7Q4hJxPDQ",
            };
          } else {
            throw new Error("password-salah");
          }
        } else {
          throw new Error("username-tidak-ditemukan");
        }
      },
    }),
  ],
  callbacks: {
    jwt(params: any) {
      if (params.user?.username) {
        params.token.username = params.user.username;
        params.token.id = params.user.id;
      }
      return params.token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
