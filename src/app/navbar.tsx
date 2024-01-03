import Link from "next/link";
import { ReactNode } from "react";
import {
  IoIosLogOut,
  IoIosMenu,
  IoMdSettings,
  IoMdAddCircle,
} from "react-icons/io";
import { AiFillDashboard } from "react-icons/ai";
import { FaUpload, FaEdit, FaInfoCircle } from "react-icons/fa";

export default function Navbar({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1 gap-3">
          <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
            <IoIosMenu size="2.2em" />
          </label>

          <p>{title}</p>
        </div>
      </div>

      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-4">{children}</div>

        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <Link href={"/"} className="btn btn-ghost text-xl">
              MIKROTIK API
            </Link>
            <li>
              <Link href={"/"}>
                <AiFillDashboard size="1.5em" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href={"/sessionSetting"}>
                <IoMdSettings size="1.5em" />
                Session Setting
              </Link>
            </li>
            <li>
              <Link href={"/uploadLogo"}>
                <FaUpload size="1.5em" />
                Upload Logo
              </Link>
            </li>
            <li>
              <Link href={"/templateEditor"}>
                <FaEdit size="1.5em" />
                Template Editor
              </Link>
            </li>
            <li>
              <Link href={"/adminSettings"}>
                <IoMdSettings size="1.5em" />
                Admin Settings
              </Link>
            </li>
            <li>
              <Link href={"/addRouter"}>
                <IoMdAddCircle size="1.5em" />
                Add Router
              </Link>
            </li>
            <li>
              <Link href={"/about"}>
                <FaInfoCircle size="1.5em" />
                About
              </Link>
            </li>
            <li>
              <Link href={"/logout"}>
                <IoIosLogOut size="1.5em" />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
