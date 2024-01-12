import { db } from "@/utils/firebase";
import { retrieveData } from "@/utils/retrieveData";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaRegCheckCircle } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

type Inputs = {
  username: string;
  password: string;
};

export default function EditDataAdmin() {
  const dataAdmin = retrieveData("admin");
  const { register, handleSubmit } = useForm<Inputs>();
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [buttonSubmit, setButtonSubmit] = useState<boolean>(false);
  const [toastSuccessUpdateData, setToastSuccessUpdateData] =
    useState<boolean>(false);
  const [toastFailedUpdateData, setToastFailedUpdateData] =
    useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = async (e) => {
    setButtonSubmit(true);
    try {
      await setDoc(doc(db, "admin", "xR13wWK5ZpED3SWYW3sj"), {
        username: e.username,
        password: e.password,
      });
      setButtonSubmit(false);
      setToastSuccessUpdateData(true);
      setTimeout(() => setToastSuccessUpdateData(false), 3000);
    } catch (e) {
      setButtonSubmit(false);
      setToastFailedUpdateData(true);
      setTimeout(() => setToastFailedUpdateData(false), 3000);
    }
  };

  return (
    <>
      {/* toast */}
      {toastSuccessUpdateData && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success font-semibold flex justify-center items-center text-white">
            <FaRegCheckCircle size="1.5em" /> Data Admin Berhasil Diperbarui
          </div>
        </div>
      )}

      {toastFailedUpdateData && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error font-semibold flex justify-center items-center text-white">
            <GiCancel size="1.5em" /> Data Admin Gagal Diperbarui
          </div>
        </div>
      )}
      {/* toast */}

      <div className="overflow-hidden rounded-lg h-max border border-base-content">
        <h1 className="p-2 font-semibold text-white">Admin</h1>

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
    </>
  );
}
