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
import { nanoid } from "nanoid";
import Image from "next/image";
import path from "path";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = { file: any };

function getFileFormat(fileName: any) {
  return path.extname(fileName).slice(1);
}

export default function FormUploadLogo() {
  const { register, handleSubmit } = useForm<Inputs>();
  const [buttonSubmit, setButtonSubmit] = useState<boolean>(false);
  const [dataLogo, setDataLogo] = useState<any>();

  useEffect(() => {
    const res = async () => {
      const fetchData = await retrieveData("logo");
      setDataLogo(fetchData);
    };
    res();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (e) => {
    const confirmSend = confirm("apakah anda yakin ??");
    if (confirmSend) {
      setButtonSubmit(true);
      try {
        const randomFileName = `${Date.now()}${nanoid()}`;
        const formatFile = getFileFormat(e.file[0].name);
        const fileName = `${randomFileName}.${formatFile}`;
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
        alert("logo berhasil diupdate !!");
        window.location.reload();
      } catch (err) {
        console.log(err);
        setButtonSubmit(false);
        alert("logo gagal diupdate !!");
        window.location.reload();
      }
    }
  };

  return (
    <div className="max-w-sm bg-base-300 rounded-lg m-auto p-6">
      {dataLogo ? (
        <div className="flex justify-center items-center h-56">
          <Image
            src={dataLogo[0].logo}
            alt="logo"
            width={100}
            height={100}
            className="rounded-lg mb-4"
          />
        </div>
      ) : (
        <div className="w-full flex justify-center p-4">
          <div className="loading loading-spinner text-info w-14"></div>
        </div>
      )}

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
