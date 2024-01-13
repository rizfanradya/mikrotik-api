"use client";
import Navbar from "@/app/navbar";
import { db } from "@/utils/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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

export default function FormAddRouter() {
  const { register, handleSubmit } = useForm<Inputs>();
  const [buttonSubmit, setButtonSubmit] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (e) => {
    const confirmSend = confirm(
      `apakah anda yakin ingin menambahkan sesi : ${e.sessionName} ??`
    );
    if (confirmSend) {
      setButtonSubmit(true);
      try {
        await addDoc(collection(db, "router"), {
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
        setButtonSubmit(false);
        alert(`sesi ${e.sessionName} "BERHASIL" ditambahkan !!`);
        router.push("/router-list");
      } catch (err) {
        setButtonSubmit(false);
        alert(`sesi ${e.sessionName} "GAGAL" ditambahkan !!`);
      }
    }
  };

  return (
    <Navbar title="Add Router">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-4 text-white"
      >
        {/* session */}
        <div className="grid gap-4">
          <div className="overflow-hidden rounded-lg">
            <h1 className="p-1 font-semibold">Session</h1>

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
          <div className="overflow-hidden rounded-lg">
            <h1 className="p-1 font-semibold">MikroTik</h1>

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
                  type={"password"}
                  {...register("password", { required: true })}
                />
              </div>
            </div>
          </div>
          {/* mikrotik */}

          {/* button */}
          {buttonSubmit ? (
            <div className="btn btn-neutral">
              <span className="loading loading-spinner"></span>
            </div>
          ) : (
            <button className="btn btn-success text-white">Save</button>
          )}
        </div>
        {/* button */}

        {/* data */}
        <div className="overflow-hidden rounded-lg">
          <h1 className="p-1 font-semibold">Data</h1>

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
    </Navbar>
  );
}
