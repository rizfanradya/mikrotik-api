"use client";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import Navbar from "@/app/navbar";
import { IoMdSettings } from "react-icons/io";
import { SubmitHandler, useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useRouter } from "next/navigation";

type Inputs = {
  sessionName: string;
  ipMikrotik: string;
  username: string;
  password: string;
  hotspotName: string;
  dnsName: string;
  currency: number;
  autoLoad: number;
  idleTimeout: number;
  trafficInterface: number;
  lifeReport: string;
};

export default function AddRouter() {
  const dbCollection = "sessionSettings";
  const router = useRouter();
  const { register, handleSubmit } = useForm<Inputs>();
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [buttonSubmit, setButtonSubmit] = useState<boolean>(false);
  // const [buttonTestPing, setButtonTestPing] = useState<boolean>(false);
  // const [buttonConnect, setButtonConnect] = useState<boolean>(false);

  const controlSeePassword = () => {
    setSeePassword(!seePassword);
  };

  const onSubmit: SubmitHandler<Inputs> = async (e) => {
    setButtonSubmit(true);
    try {
      const docRef = await addDoc(collection(db, dbCollection), {
        sessionName: e.sessionName,
        ipMikrotik: e.ipMikrotik,
        username: e.username,
        password: e.password,
        hotspotName: e.hotspotName,
        dnsName: e.dnsName,
        currency: e.currency,
        autoLoad: e.autoLoad,
        idleTimeout: e.idleTimeout,
        trafficInterface: e.trafficInterface,
        lifeReport: e.lifeReport,
      });
      alert(`data berhasil ditambahkan\nID : ${docRef.id}`);
      setButtonSubmit(false);
      router.push(`/adminSettings`);
    } catch (e) {
      alert(`data gagal ditambahkan\nerror : ${e}`);
    }
  };

  // const testPing = (e: any) => {
  //   setButtonTestPing(true);
  //   if (e === true) {
  //     alert(`ping ok 200`);
  //     setButtonTestPing(false);
  //   } else if (e === false) {
  //     alert(`ping not ok 404`);
  //     setButtonTestPing(false);
  //   } else {
  //     alert(`data invalid / server error`);
  //     setButtonTestPing(false);
  //   }
  // };

  // const handleConnect = (e: any) => {
  //   setButtonConnect(true);
  //   if (e === true) {
  //     alert(`berhasil terhubung`);
  //     setButtonConnect(false);
  //   } else if (e === false) {
  //     alert(`gagal terhubung`);
  //     setButtonConnect(false);
  //   } else {
  //     alert(`data invalid / server error`);
  //     setButtonConnect(false);
  //   }
  // };

  return (
    <Navbar title="Session Settings">
      <div className="bg-slate-700 text-white rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 font-semibold bg-slate-800 p-3">
          <IoMdSettings size="1.5em" />
          <h1>Session Settings</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-4 p-3"
        >
          {/* session */}
          <div className="grid gap-4">
            <div className="border-slate-800 border-2 overflow-hidden rounded-lg">
              <h1 className="bg-slate-800 p-3 font-semibold">Session</h1>

              <div className="p-2 md:grid md:grid-cols-2 items-center">
                <label
                  htmlFor="Session Name"
                  className="label-text text-sm font-semibold"
                >
                  Session Name
                </label>
                <input
                  id="Session Name"
                  className="input input-bordered input-info w-full"
                  placeholder="Session Name"
                  type="text"
                  required
                  {...register("sessionName", { required: true })}
                />
              </div>
            </div>
            {/* session */}

            {/* mikrotik */}
            <div className="border-slate-800 border-2 overflow-hidden rounded-lg">
              <h1 className="bg-slate-800 p-3 font-semibold">MikroTik</h1>

              <div className="p-2 md:grid md:grid-cols-2 items-center">
                <label
                  htmlFor="Ip Mikrotik"
                  className="label-text text-sm font-semibold"
                >
                  Ip Mikrotik
                </label>
                <input
                  id="Ip Mikrotik"
                  className="input input-bordered input-info w-full"
                  placeholder="Ip Mikrotik"
                  type="text"
                  required
                  {...register("ipMikrotik", { required: true })}
                />
              </div>

              <div className="p-2 md:grid md:grid-cols-2 items-center">
                <label
                  htmlFor="Username"
                  className="label-text text-sm font-semibold"
                >
                  Username
                </label>
                <input
                  id="Username"
                  className="input input-bordered input-info w-full"
                  placeholder="Username"
                  type="text"
                  required
                  {...register("username", { required: true })}
                />
              </div>

              <div className="p-2 md:grid md:grid-cols-2 items-center">
                <label
                  htmlFor="password"
                  className="label-text text-sm font-semibold"
                >
                  Password
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="password"
                    className="input input-bordered input-info w-full"
                    placeholder="Password"
                    required
                    type={seePassword ? "text" : "password"}
                    {...register("password", { required: true })}
                  />
                  <span
                    className="cursor-pointer"
                    onClick={() => controlSeePassword()}
                  >
                    {seePassword ? (
                      <FaEyeSlash size="1.5em" />
                    ) : (
                      <FaEye size="1.5em" />
                    )}
                  </span>
                </div>
              </div>
            </div>
            {/* mikrotik */}

            {/* button */}
            {/* <div className="grid grid-cols-3 gap-2"> */}
            {buttonSubmit ? (
              <div className="btn btn-neutral">
                <span className="loading loading-spinner"></span>
              </div>
            ) : (
              <button className="btn btn-success text-white">Save</button>
            )}

            {/* {buttonConnect ? (
                <div className="btn btn-neutral">
                  <span className="loading loading-spinner"></span>
                </div>
              ) : (
                <div
                  onClick={() => handleConnect(false)}
                  className="btn btn-success text-white"
                >
                  Connect
                </div>
              )}

              {buttonTestPing ? (
                <div className="btn btn-neutral">
                  <span className="loading loading-spinner"></span>
                </div>
              ) : (
                <div
                  onClick={() => testPing(false)}
                  className="btn btn-warning text-white"
                >
                  Ping
                </div>
              )} */}
          </div>
          {/* </div> */}
          {/* button */}

          {/* data */}
          <div className="border-slate-800 border-2 overflow-hidden rounded-lg">
            <h1 className="bg-slate-800 p-3 font-semibold">Data</h1>

            <div className="p-2 md:grid md:grid-cols-2 items-center">
              <label
                htmlFor="Hotspot Name"
                className="label-text text-sm font-semibold"
              >
                Hotspot Name
              </label>
              <input
                id="Hotspot Name"
                className="input input-bordered input-info w-full"
                placeholder="Hotspot Name"
                type="text"
                required
                {...register("hotspotName", { required: true })}
              />
            </div>

            <div className="p-2 md:grid md:grid-cols-2 items-center">
              <label
                htmlFor="DNS Name"
                className="label-text text-sm font-semibold"
              >
                DNS Name
              </label>
              <input
                id="DNS Name"
                className="input input-bordered input-info w-full"
                placeholder="DNS Name"
                type="text"
                required
                {...register("dnsName", { required: true })}
              />
            </div>

            <div className="p-2 md:grid md:grid-cols-2 items-center">
              <label
                htmlFor="Currency (RP)"
                className="label-text text-sm font-semibold"
              >
                Currency (RP)
              </label>
              <input
                id="Currency (RP)"
                className="input input-bordered input-info w-full"
                placeholder="Currency (RP)"
                type="number"
                required
                {...register("currency", { required: true })}
              />
            </div>

            <div className="p-2 md:grid md:grid-cols-2 items-center">
              <label
                htmlFor="Auto Load (SEC)"
                className="label-text text-sm font-semibold"
              >
                Auto Load (SEC)
              </label>
              <input
                id="Auto Load (SEC)"
                className="input input-bordered input-info w-full"
                placeholder="Auto Load (SEC)"
                type="number"
                required
                defaultValue={10}
                {...register("autoLoad", { required: true })}
              />
            </div>

            <div className="p-2 md:grid md:grid-cols-2 items-center">
              <label className="label-text text-sm font-semibold">
                Idle Timeout
              </label>
              <select
                className="select select-info w-full"
                {...register("idleTimeout", { required: true })}
              >
                <option defaultValue={10}>10</option>
                <option value={5}>5</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
                <option value={"disable"}>Disable</option>
              </select>
            </div>

            <div className="p-2 md:grid md:grid-cols-2 items-center">
              <label
                htmlFor="Traffic Interface"
                className="label-text text-sm font-semibold"
              >
                Traffic Interface
              </label>
              <input
                id="Traffic Interface"
                className="input input-bordered input-info w-full"
                placeholder="Traffic Interface"
                type="number"
                required
                defaultValue={1}
                {...register("trafficInterface", { required: true })}
              />
            </div>

            <div className="p-2 md:grid md:grid-cols-2 items-center">
              <label className="label-text text-sm font-semibold">
                Life Report
              </label>
              <select
                className="select select-info w-full"
                {...register("lifeReport", { required: true })}
              >
                <option defaultValue={"enable"}>Enable</option>
                <option value={"disable"}>Disable</option>
              </select>
            </div>
          </div>
          {/* data */}
        </form>
      </div>
    </Navbar>
  );
}
