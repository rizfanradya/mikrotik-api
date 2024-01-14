"use client";
import { db, storage } from "@/utils/firebase";
import { retrieveData } from "@/utils/retrieveData";
import { doc, setDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import LogoImage from "./logoImage";
import randomFileName from "@/utils/randomFileName";

type Inputs = { file: any };

export default function FormUploadLogo() {
  const { register, handleSubmit } = useForm<Inputs>();
  const [buttonSubmit, setButtonSubmit] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = async (e) => {
    const dataLogo: any = await retrieveData("logo");
    const confirmSend = confirm("apakah anda yakin ??");
    if (confirmSend) {
      setButtonSubmit(true);
      try {
        const fileName = randomFileName(e.file[0].name);
        const listRef = ref(storage);
        const listStg = await listAll(listRef);
        if (listStg.items.length !== 0) {
          const deleteLogo = dataLogo[0].logo;
          const deleteRef = ref(storage, deleteLogo);
          await deleteObject(deleteRef);
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
        const fileRef = ref(storage, fileName);
        await uploadBytes(fileRef, e.file[0]);
        const downloadURL = await getDownloadURL(fileRef);
        await setDoc(doc(db, "logo", "2xu2OnTDAjAKPDPCFNLJ"), {
          logo: downloadURL,
        });
        setButtonSubmit(false);
        alert(`logo "BERHASIL" diupdate !!`);
        window.location.reload();
      } catch (err) {
        console.log(err);
        setButtonSubmit(false);
        alert(`logo "GAGAL" diupdate !!`);
        window.location.reload();
      }
    }
  };

  return (
    <div className="max-w-sm bg-base-100 rounded-lg m-auto p-6">
      <LogoImage />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-between flex-col"
      >
        <input
          type="file"
          className="file-input file-input-bordered w-full"
          required
          {...register("file", { required: true })}
        />

        {buttonSubmit ? (
          <div className="btn btn-neutral mt-4">
            <span className="loading loading-spinner"></span>
          </div>
        ) : (
          <button className="btn btn-success text-white mt-4">
            Upload Logo
          </button>
        )}
      </form>
    </div>
  );
}
