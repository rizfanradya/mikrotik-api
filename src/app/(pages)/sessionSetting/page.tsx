import Navbar from "@/app/navbar";
import { Label } from "flowbite-react";
import { IoMdSettings } from "react-icons/io";

export default function SessionSetting() {
  return (
    <Navbar title="Session Settings">
      <div className="bg-slate-700 text-white rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 font-semibold bg-slate-800 p-3">
          <IoMdSettings size="1.5em" />
          <h1>Session Settings</h1>
        </div>

        <div className="p-3 grid gap-4">
          <div className="grid gap-4">
            <div className="border-slate-800 border-2 overflow-hidden rounded-lg">
              <h1 className="bg-slate-800 p-3 font-semibold">Session</h1>
              <div className="grid grid-cols-2 items-center p-3">
                <label htmlFor="session" className="label-text text-base">
                  Session Name
                </label>
                <input
                  id="session"
                  className="input input-bordered input-info h-8 w-full"
                  placeholder="Session Name"
                  type="text"
                />
              </div>
            </div>

            <div className="border-slate-800 border-2 overflow-hidden rounded-lg">
              <h1 className="bg-slate-800 p-3 font-semibold">MikroTik</h1>
              <div>
                <div className="grid grid-cols-2 items-center p-3">
                  <label htmlFor="ipmikrotik" className="label-text text-base">
                    Ip MikroTik
                  </label>
                  <input
                    id="ipmikrotik"
                    className="input input-bordered input-info h-8 w-full"
                    placeholder="Ip MikroTik"
                    type="text"
                  />
                </div>

                <div className="grid grid-cols-2 items-center p-3">
                  <label htmlFor="username" className="label-text text-base">
                    Username
                  </label>
                  <input
                    id="username"
                    className="input input-bordered input-info h-8 w-full"
                    placeholder="Username"
                    type="text"
                  />
                </div>

                <div className="grid grid-cols-2 items-center p-3">
                  <label htmlFor="password" className="label-text text-base">
                    Password
                  </label>
                  <input
                    id="password"
                    className="input input-bordered input-info h-8 w-full"
                    placeholder="Password"
                    type="password"
                  />
                </div>
              </div>
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </Navbar>
  );
}
