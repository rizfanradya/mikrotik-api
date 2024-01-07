"use client";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import Navbar from "@/app/navbar";
import { IoMdSettings } from "react-icons/io";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  sessionName: string;
  ipMikrotik: string;
  username: string;
  password: string;
};

export default function SessionSetting() {
  const { register, handleSubmit } = useForm<Inputs>();
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const controlSeePassword = () => {
    setSeePassword(!seePassword);
  };
  const onSubmit: SubmitHandler<Inputs> = (e) => {
    console.log(e);
  };

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
                  <span onClick={() => controlSeePassword()}>
                    {seePassword ? (
                      <FaEyeSlash size="1.5em" />
                    ) : (
                      <FaEye size="1.5em" />
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button className="btn btn-info text-white">Save</button>
              <button className="btn btn-success text-white">Connect</button>
              <button className="btn btn-warning text-white">Ping</button>
            </div>
          </div>

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
              />
            </div>

            <div className="p-2 md:grid md:grid-cols-2 items-center">
              <label className="label-text text-sm font-semibold">
                Idle Timeout
              </label>
              <select className="select select-info w-full">
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
              />
            </div>

            <div className="p-2 md:grid md:grid-cols-2 items-center">
              <label className="label-text text-sm font-semibold">
                Life Report
              </label>
              <select className="select select-info w-full">
                <option defaultValue={"enable"}>Enable</option>
                <option value={"disable"}>Disable</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </Navbar>
  );
}
