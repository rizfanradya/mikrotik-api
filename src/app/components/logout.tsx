"use client";
import { signOut } from "next-auth/react";
import { IoIosLogOut } from "react-icons/io";

export default function Logout() {
  return (
    <li onClick={() => signOut()}>
      <span>
        <IoIosLogOut size="1.7em" /> Logout
      </span>
    </li>
  );
}
