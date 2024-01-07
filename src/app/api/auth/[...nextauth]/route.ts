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

        const usernameData = query(
          collection(db, "admin"),
          where("username", "==", "admin")
        );
        const passwordData = query(
          collection(db, "admin"),
          where("password", "==", "123456")
        );

        const usernameQuerySnapshot = await getDocs(usernameData);
        const passwordQuerySnapshot = await getDocs(passwordData);
        const hasUsernameMatchingData = usernameQuerySnapshot.docs.some(
          (doc) => {
            const data = doc.data();
            if (data.username === username) {
              const hasPasswordMatchingData = passwordQuerySnapshot.docs.some(
                (doc) => {
                  const data = doc.data();
                  if (data.password === password) {
                    return data.username;
                  } else if (data.password !== password) {
                    throw new Error("password salah");
                  } else {
                    throw new Error("server error");
                  }
                }
              );
              return hasPasswordMatchingData;
            } else if (data.username !== "admin") {
              throw new Error("username salah");
            } else {
              throw new Error("server error");
            }
          }
        );
        return {
          username: hasUsernameMatchingData,
          id: "JY18wz3Fw6A7Q4hJxPDQ",
        };
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
