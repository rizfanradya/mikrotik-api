"use client";
import { db } from "@/utils/firebase";
import { retrieveData } from "@/utils/retrieveData";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

export default function FormAdminSettings() {
  const { register, handleSubmit } = useForm<Inputs>();
  const [buttonSubmit, setButtonSubmit] = useState<boolean>(false);
  const [dataAdmin, setDataAdmin] = useState<any>();

  useEffect(() => {
    const res = async () => {
      const fetchData = await retrieveData("admin");
      setDataAdmin(fetchData);
    };
    res();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (e) => {
    const confirmSend = confirm("apakah anda yakin ??");
    if (confirmSend) {
      setButtonSubmit(true);
      try {
        await setDoc(doc(db, "admin", "xR13wWK5ZpED3SWYW3sj"), {
          username: e.username,
          password: e.password,
        });
        setButtonSubmit(false);
        alert("data admin berhasil diperbarui !!");
        window.location.reload();
      } catch (e) {
        setButtonSubmit(false);
        alert("data admin gagal diperbarui !!");
        window.location.reload();
      }
    }
  };

  return (
    <div className="max-w-sm bg-base-300 rounded-lg m-auto">
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
                type="password"
                {...register("password", { required: true })}
              />
            </div>
          </div>

          {buttonSubmit ? (
            <div className="btn btn-neutral w-full">
              <span className="loading loading-spinner"></span>
            </div>
          ) : (
            <button className="btn btn-success text-white w-full">Save</button>
          )}
        </form>
      ) : (
        <div className="w-full flex justify-center p-4">
          <div className="loading loading-spinner text-info w-14"></div>
        </div>
      )}
    </div>
  );
}
