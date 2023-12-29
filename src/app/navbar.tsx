import Link from "next/link";
import { ReactNode } from "react";
import {
  IoIosLogOut,
  IoIosMenu,
  IoMdSettings,
  IoMdAddCircle,
} from "react-icons/io";

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

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href={"/"}>
                Logout <IoIosLogOut size="1.5em" />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

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
              <Link href={"/adminSettings"}>
                <IoMdSettings size="1.5em" />
                Admin Settings
              </Link>
            </li>
            <li>
              <Link href={"/"}>
                <IoMdAddCircle size="1.5em" />
                Add Router
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-4">{children}</div>
    </>
  );
}