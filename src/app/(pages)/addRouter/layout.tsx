"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/app/navbar";

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

export default function AddRouterLayout() {
  const { register, handleSubmit } = useForm<Inputs>();

  const dbCollection = "router";
  const router = useRouter();
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [buttonSubmit, setButtonSubmit] = useState<boolean>(false);

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
      router.push(`/routerSettings`);
    } catch (e) {
      alert(`data gagal ditambahkan\nerror : ${e}`);
    }
  };

  return (
    <Navbar title="Add Router">
      <div className="text-white rounded-lg overflow-hidden">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-4"
        >
          {/* session */}
          <div className="grid gap-4">
            <div className="border-primary border-2 overflow-hidden rounded-lg bg-base-200">
              <h1 className="bg-primary p-1 font-semibold">Session</h1>

              <div className="p-2 md:grid md:grid-cols-2 items-center">
                <label htmlFor="Session Name" className="label-text">
                  Session Name
                </label>
                <input
                  id="Session Name"
                  className="input input-bordered input-sm w-full"
                  type="text"
                  required
                  {...register("sessionName", { required: true })}
                />
              </div>
            </div>
            {/* session */}

            {/* mikrotik */}
            <div className="border-primary border-2 overflow-hidden rounded-lg">
              <h1 className="bg-primary p-1 font-semibold">MikroTik</h1>

              <div className="p-2 md:grid md:grid-cols-2 items-center">
                <label htmlFor="Ip Mikrotik" className="label-text">
                  Ip Mikrotik
                </label>
                <input
                  id="Ip Mikrotik"
                  className="input input-bordered input-sm w-full"
                  type="text"
                  required
                  {...register("ipMikrotik", { required: true })}
                />
              </div>

              <div className="p-2 md:grid md:grid-cols-2 items-center">
                <label htmlFor="Username" className="label-text">
                  Username
                </label>
                <input
                  id="Username"
                  className="input input-bordered input-sm w-full"
                  type="text"
                  required
                  {...register("username", { required: true })}
                />
              </div>

              <div className="p-2 md:grid md:grid-cols-2 items-center">
                <label htmlFor="password" className="label-text">
                  Password
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="password"
                    className="input input-bordered input-sm w-full"
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
          <div className="border-primary border-2 overflow-hidden rounded-lg">
            <h1 className="bg-primary p-1 font-semibold">Data</h1>

            <div className="p-2 md:grid md:grid-cols-2 items-center">
              <label htmlFor="Hotspot Name" className="label-text">
                Hotspot Name
              </label>
              <input
                id="Hotspot Name"
                className="input input-bordered input-sm w-full"
                type="text"
                required
                {...register("hotspotName", { required: true })}
              />
            </div>

            <div className="p-2 md:grid md:grid-cols-2 items-center">
              <label htmlFor="DNS Name" className="label-text">
                DNS Name
              </label>
              <input
                id="DNS Name"
                className="input input-bordered input-sm w-full"
                type="text"
                required
                {...register("dnsName", { required: true })}
              />
            </div>

            <div className="p-2 md:grid md:grid-cols-2 items-center">
              <label htmlFor="Currency (RP)" className="label-text">
                Currency (RP)
              </label>
              <input
                id="Currency (RP)"
                className="input input-bordered input-sm w-full"
                type="number"
                required
                {...register("currency", { required: true })}
              />
            </div>

            <div className="p-2 md:grid md:grid-cols-2 items-center">
              <label htmlFor="Auto Load (SEC)" className="label-text">
                Auto Load (SEC)
              </label>
              <input
                id="Auto Load (SEC)"
                className="input input-bordered input-sm w-full"
                type="number"
                required
                defaultValue={10}
                {...register("autoLoad", { required: true })}
              />
            </div>

            <div className="p-2 md:grid md:grid-cols-2 items-center">
              <label className="label-text">Idle Timeout</label>
              <select
                className="select select-bordered select-sm w-full py-0"
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
              <label htmlFor="Traffic Interface" className="label-text">
                Traffic Interface
              </label>
              <input
                id="Traffic Interface"
                className="input input-bordered input-sm w-full"
                type="number"
                required
                defaultValue={1}
                {...register("trafficInterface", { required: true })}
              />
            </div>

            <div className="p-2 md:grid md:grid-cols-2 items-center">
              <label className="label-text">Life Report</label>
              <select
                className="select select-bordered select-sm w-full py-0"
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
