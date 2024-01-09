"use client";
import Navbar from "@/app/navbar";
import { retrieveData } from "@/utils/retrieveData";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaServer } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

type Inputs = {
  username: string;
  password: string;
};

export default function RouterSettingsLayout() {
  const dataRouter = retrieveData("router");
  const dataAdmin = retrieveData("admin");
  const { register, handleSubmit } = useForm<Inputs>();
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [buttonSubmit, setButtonSubmit] = useState<boolean>(false);
  const [menuData, setMenuData] = useState<any>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (e) => {
    setButtonSubmit(true);
    const confirmSave = confirm("apakah anda yakin ?");

    if (confirmSave) {
      try {
        await setDoc(doc(db, "admin", "xR13wWK5ZpED3SWYW3sj"), {
          username: e.username,
          password: e.password,
        });
        alert(
          `data berhasil diperbarui\nsilahkan login menggunakan data yang telah anda perbarui`
        );
        setButtonSubmit(false);
      } catch (e) {
        alert(`data gagal diperbarui`);
        setButtonSubmit(false);
      }
    } else {
      setButtonSubmit(false);
    }
  };

  const deleteData = async (
    id: string,
    hotspotName: string,
    sessionName: string
  ) => {
    const confirmDelete = confirm(
      `apakah anda yakin ingin mengahpus data :\nhotspot name : ${hotspotName}\nsession name : ${sessionName}\n???`
    );
    if (confirmDelete) {
      await deleteDoc(doc(db, "router", id));
    } else {
      alert(`data ${hotspotName} batal dihapus!!`);
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
    <Navbar title="Router Settings">
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
                  <div className="absolute top-0 left-0 badge badge-success">
                    {index + 1}
                  </div>

                  <div className="w-14">
                    <FaServer size="3em" />
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
                          <li
                            onClick={() =>
                              deleteData(
                                doc.id,
                                doc.hotspotName,
                                doc.sessionName
                              )
                            }
                          >
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

        {/* admin */}
        <div className="border-primary border-2 overflow-hidden rounded-lg bg-base-200 h-max">
          <h1 className="bg-primary p-1 font-semibold text-white">Admin</h1>

          {dataAdmin ? (
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 grid gap-5">
              <div className="md:grid md:grid-cols-2 items-center">
                <label htmlFor="Username" className="label-text">
                  Username
                </label>
                <input
                  id="Username"
                  className="input input-bordered input-sm w-full"
                  type="text"
                  required
                  defaultValue={dataAdmin[0].username}
                  {...register("username", { required: true })}
                />
              </div>

              <div className="md:grid md:grid-cols-2 items-center ">
                <label htmlFor="password" className="label-text">
                  Password
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="password"
                    className="input input-bordered input-sm w-full"
                    required
                    defaultValue={dataAdmin[0].password}
                    type={seePassword ? "text" : "password"}
                    {...register("password", { required: true })}
                  />
                  <span
                    className="cursor-pointer"
                    onClick={() => setSeePassword(!seePassword)}
                  >
                    {seePassword ? (
                      <FaEyeSlash size="1.5em" />
                    ) : (
                      <FaEye size="1.5em" />
                    )}
                  </span>
                </div>
              </div>

              {buttonSubmit ? (
                <div className="btn btn-neutral w-full">
                  <span className="loading loading-spinner"></span>
                </div>
              ) : (
                <button className="btn btn-success text-white w-full">
                  Save
                </button>
              )}
            </form>
          ) : (
            <div className="w-full flex justify-center p-4">
              <div className="loading loading-spinner text-info w-14"></div>
            </div>
          )}
        </div>
        {/* admin */}
      </div>
    </Navbar>
  );
}
