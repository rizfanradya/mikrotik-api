"use client";
import Navbar from "@/app/navbar";
import { retrieveData } from "@/utils/retrieveData";
import Link from "next/link";
import randomColor from "randomcolor";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaServer, FaExternalLinkAlt, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
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

  const onSubmit: SubmitHandler<Inputs> = async (e) => {
    setButtonSubmit(true);
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
    }
  };

  return (
    <Navbar title="Router Settings">
      <div className="md:flex">
        {/* router list */}
        <div className="border-primary border-2 overflow-hidden rounded-lg bg-base-200 w-full mb-4 md:mb-0 md:mr-4">
          <h1 className="bg-primary p-1 font-semibold text-white">
            Router List
          </h1>

          {dataRouter ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
              {dataRouter.map((doc: any) => (
                <div
                  key={doc.id}
                  style={{
                    backgroundColor: randomColor({ luminosity: "bright" }),
                  }}
                  className="flex gap-4 items-center m-2 rounded-lg p-3 text-white"
                >
                  <div className="w-16">
                    <FaServer size="4em" />
                  </div>
                  <div>
                    <div className="text-sm">
                      <p>Hotspot Name : {doc.hotspotName}</p>
                      <p>Session Name : {doc.sessionName}</p>
                    </div>

                    <div className="flex gap-2">
                      <Link className="badge badge-accent" href={"/"}>
                        <FaExternalLinkAlt />
                        Open
                      </Link>
                      <Link className="badge badge-primary" href={"/"}>
                        <FaEdit />
                        Edit
                      </Link>
                      <Link className="badge-error badge" href={"/"}>
                        <MdDelete />
                        Delete
                      </Link>
                    </div>
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
