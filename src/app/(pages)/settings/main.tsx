"use client";
import Navbar from "@/app/navbar";
import { deleteDoc, doc } from "firebase/firestore";
import { retrieveData } from "@/utils/retrieveData";
import { db } from "@/utils/firebase";
import { useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaServer, FaRegCheckCircle } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import Link from "next/link";
import randomColor from "randomcolor";
import AddRouter from "./addRouter";
import EditDataAdmin from "./editDataAdmin";
import UploadLogo from "./uploadLogo";

export default function RouterSettingsLayout() {
  const dataRouter = retrieveData("router");
  const [menuData, setMenuData] = useState<any>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [toastSuccessDeleteData, setToastSuccessDeleteData] =
    useState<boolean>(false);
  const [toastFailedDeleteData, setToastFailedDeleteData] =
    useState<boolean>(false);

  const deleteData: any = async (id: string) => {
    try {
      await deleteDoc(doc(db, "router", id));
      setToastSuccessDeleteData(true);
      setTimeout(() => setToastSuccessDeleteData(false), 3000);
    } catch (e) {
      setToastFailedDeleteData(true);
      setTimeout(() => setToastFailedDeleteData(false), 3000);
    }
  };

  const toggleMenu = (id: string) => {
    setMenuData((prevId: any) => (prevId === id ? null : id));
  };
  const handleClickOutside = (event: any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuData(null);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Navbar title="Settings">
      {/* toast */}
      {toastSuccessDeleteData && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success font-semibold flex justify-center items-center text-white">
            <FaRegCheckCircle size="1.5em" /> Data Berhasil Dihapus
          </div>
        </div>
      )}

      {toastFailedDeleteData && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error font-semibold flex justify-center items-center text-white">
            <GiCancel size="1.5em" /> Data Gagal Dihapus
          </div>
        </div>
      )}
      {/* toast */}

      <div className="grid grid-cols-2 sm:flex gap-3">
        <AddRouter />
        <UploadLogo />
      </div>

      <div className="md:flex">
        {/* router list */}
        <div className="border-primary border-2 rounded-lg bg-base-200 w-full mb-4 md:mb-0 md:mr-4">
          <h1 className="bg-primary p-1 font-semibold text-white">
            Router List
          </h1>

          {dataRouter ? (
            <div
              ref={menuRef}
              className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-3 m-3"
            >
              {dataRouter.map((doc: any, index: any) => (
                <div
                  key={doc.id}
                  className="flex gap-4 items-center rounded-lg p-3 text-white bg-slate-700 relative"
                >
                  <div className="w-14 relative flex justify-center items-center">
                    <span className="absolute font-semibold drop-shadow-[0_2px_2px_rgba(0,0,0,1)] text-4xl">
                      {index + 1}
                    </span>
                    <span
                      style={{ color: randomColor({ luminosity: "light" }) }}
                    >
                      <FaServer size="3em" />
                    </span>
                  </div>

                  <div>
                    <div className="text-xs grid gap-2">
                      <p>Hotspot Name : {doc.hotspotName}</p>
                      <p>Session Name : {doc.sessionName}</p>
                    </div>

                    <div
                      onClick={() => toggleMenu(doc.id)}
                      className="absolute top-0 right-0 bg-slate-800 p-2 rounded-bl-3xl rounded-tr-lg cursor-pointer"
                    >
                      <CiMenuKebab size="1.2em" />
                    </div>

                    {menuData === doc.id && (
                      <div className="absolute top-0 right-8 bg-slate-800 rounded-lg z-10">
                        <ul className="font-light text-[10px] menu">
                          <li>
                            <Link href={"/"}>Connect</Link>
                          </li>
                          <li>
                            <Link href={"/"}>Ping</Link>
                          </li>
                          <li>
                            <Link href={"/"}>Edit</Link>
                          </li>
                          <li onClick={() => deleteData(doc.id)}>
                            <span>Delete</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full flex justify-center p-4">
              <div className="loading loading-spinner text-info w-14"></div>
            </div>
          )}
        </div>
        {/* router list */}

        <EditDataAdmin />
      </div>
    </Navbar>
  );
}
