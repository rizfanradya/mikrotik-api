/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { signIn, useSession } from "next-auth/react";
import LoadingSpinner from "@/app/components/loading";
import AddRouterLayout from "./layout";

export default function AddRouter() {
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

  // const [buttonTestPing, setButtonTestPing] = useState<boolean>(false);
  // const [buttonConnect, setButtonConnect] = useState<boolean>(false);

  // const testPing = (e: any) => {
  //   setButtonTestPing(true);
  //   if (e === true) {
  //     alert(`ping ok 200`);
  //     setButtonTestPing(false);
  //   } else if (e === false) {
  //     alert(`ping not ok 404`);
  //     setButtonTestPing(false);
  //   } else {
  //     alert(`data invalid / server error`);
  //     setButtonTestPing(false);
  //   }
  // };

  // const handleConnect = (e: any) => {
  //   setButtonConnect(true);
  //   if (e === true) {
  //     alert(`berhasil terhubung`);
  //     setButtonConnect(false);
  //   } else if (e === false) {
  //     alert(`gagal terhubung`);
  //     setButtonConnect(false);
  //   } else {
  //     alert(`data invalid / server error`);
  //     setButtonConnect(false);
  //   }
  // };

  return <AddRouterLayout />;
}
