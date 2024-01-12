import Link from "next/link";
import { ReactNode } from "react";
import { IoIosMenu, IoMdSettings } from "react-icons/io";
import { AiFillDashboard } from "react-icons/ai";
import { FaUser, FaUpload, FaServer } from "react-icons/fa";
import Logout from "./components/logout";

export default function Navbar({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <>
      <div className="navbar bg-base-300">
        <div className="flex-1 gap-3">
          <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
            <IoIosMenu size="2.2em" />
          </label>
          <p className="font-semibold text-center m-auto">{title}</p>
        </div>
      </div>

      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-2">{children}</div>

        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu w-3/4 sm:w-80 min-h-full bg-base-100 text-base-content">
            <Link href={"/"} className="btn btn-ghost">
              MIKROTIK API
            </Link>

            <li>
              <Link href={"/"}>
                <AiFillDashboard size="1.5em" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href={"/settings"}>
                <IoMdSettings size="1.5em" />
                Settings
              </Link>
            </li>
            <li>
              <Link href={"/router"}>
                <FaServer size="1.5em" />
                Router
              </Link>
            </li>
            <li>
              <Link href={"/admin-settings"}>
                <FaUser size="1.3em" /> Admin Setting
              </Link>
            </li>
            <li>
              <Link href={"/upload-logo"}>
                <FaUpload size="1.3em" /> Upload Logo
              </Link>
            </li>
            <Logout />
          </ul>
        </div>
      </div>
    </>
  );
}
