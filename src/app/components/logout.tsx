"use client";
import { signOut } from "next-auth/react";
import { IoIosLogOut } from "react-icons/io";

export default function Logout() {
  return (
    <div className="px-4 cursor-pointer" onClick={() => signOut()}>
      <IoIosLogOut size="1.7em" />
    </div>
  );
}
