"use client";
import { signIn, useSession } from "next-auth/react";
import LoadingSpinner from "./loading";
import { ReactNode } from "react";

export default function AuthSession({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <LoadingSpinner />;
  }
  if (!session) {
    return (
      <div className="w-screen h-screen p-4 text-center text-2xl font-semibold tracking-wider text-white grid justify-center items-center">
        <p>ANDA HARUS LOGIN TERLEBIH DAHULU</p>
        <button onClick={() => signIn()} className="btn btn-outline btn-info">
          LOGIN
        </button>
      </div>
    );
  } else {
    return <>{children}</>;
  }
}
