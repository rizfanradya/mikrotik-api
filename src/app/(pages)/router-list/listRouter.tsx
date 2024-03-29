"use client";
import { db } from "@/utils/firebase";
import { retrieveData } from "@/utils/retrieveData";
import axios from "axios";
import { deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaServer } from "react-icons/fa";

export default function ListRouter() {
  const [buttonDelete, setButtonDelete] = useState<boolean>(false);
  const [buttonPing, setButtonPing] = useState<boolean>(false);

  const [dataRouter, setDataRouter] = useState<any>();
  useEffect(() => {
    const res = async () => {
      const fetchData = await retrieveData("router");
      setDataRouter(fetchData);
    };
    res();
  }, []);

  const ping = async (host: string, username: string, password: string) => {
    const errCode = 111;
    const errorMess = "connection refused";
    setButtonPing(true);
    try {
      await axios.get(`https://${host}`, {
        auth: { username, password },
      });
      alert(`host : ${host}\nping "OK" !!`);
      setButtonPing(false);
    } catch (error) {
      alert(
        `host : ${host}\nerror code : ${errCode}\nerror message : ${errorMess}\nping "TIMEOUT" !!`
      );
      setButtonPing(false);
      console.log(error);
    }
  };

  const deleteData: any = async (id: string, sessionName: string) => {
    const confirmDelete = confirm(
      `apakah anda yakin ingin menghapus sesi : ${sessionName} ??`
    );
    if (confirmDelete) {
      setButtonDelete(true);
      try {
        await deleteDoc(doc(db, "router", id));
        setButtonDelete(false);
        alert(`sesi : ${sessionName} "BERHASIL" dihapus !!`);
        window.location.reload();
      } catch (e) {
        setButtonDelete(false);
        alert(`sesi : ${sessionName} "GAGAL" dihapus !!`);
        window.location.reload();
      }
    }
  };

  const [menuData, setMenuData] = useState<any>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
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
    <>
      {dataRouter ? (
        <div
          ref={menuRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3"
        >
          {dataRouter.map((doc: any, index: any) => (
            <div
              key={doc.id}
              className="flex gap-4 items-center rounded-lg p-2 text-white bg-slate-800 relative"
            >
              <div className="w-14 relative flex justify-center items-center">
                <span className="absolute font-semibold drop-shadow-[0_2px_2px_rgba(0,0,0,1)] text-4xl">
                  {index + 1}
                </span>
                <FaServer size="3em" />
              </div>

              <div>
                <div className="text-xs grid gap-2">
                  <p>Hotspot Name : {doc.hotspotName}</p>
                  <p>Session Name : {doc.sessionName}</p>
                </div>

                <div
                  onClick={() => toggleMenu(doc.id)}
                  className="absolute top-0 right-0 bg-slate-700 p-2 rounded-bl-3xl rounded-tr-lg cursor-pointer"
                >
                  <CiMenuKebab size="1.2em" />
                </div>

                {menuData === doc.id && (
                  <div className="absolute top-0 right-8 bg-slate-700 rounded-lg z-10">
                    <ul className="font-light text-[10px] menu">
                      <li>
                        <Link href={`/dashboard/${doc.id}`}>Connect</Link>
                      </li>

                      {buttonPing ? (
                        <li className="m-auto">
                          <span className="loading loading-spinner"></span>
                        </li>
                      ) : (
                        <li>
                          <span
                            onClick={() =>
                              ping(doc.ipMikrotik, doc.username, doc.password)
                            }
                          >
                            Ping
                          </span>
                        </li>
                      )}

                      <li>
                        <Link href={`/edit-router/${doc.id}`}>Edit</Link>
                      </li>

                      {buttonDelete ? (
                        <li className="m-auto">
                          <span className="loading loading-spinner"></span>
                        </li>
                      ) : (
                        <li onClick={() => deleteData(doc.id, doc.sessionName)}>
                          <span>Delete</span>
                        </li>
                      )}
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
    </>
  );
}
