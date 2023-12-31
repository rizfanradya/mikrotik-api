"use client";
import Navbar from "./navbar";
import { signIn, useSession } from "next-auth/react";
import LoadingSpinner from "@/app/components/loading";

export default function Home() {
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
  }
  return <Navbar title="Dashboard">Dashboard Page</Navbar>;
}
