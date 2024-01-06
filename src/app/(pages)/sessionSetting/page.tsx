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

        <div className="p-3">
          <div>
            <div className="border-slate-800 border-2 overflow-hidden rounded-lg">
              <h1 className="bg-slate-800 p-3 font-semibold">Session</h1>
              <div className="flex items-center justify-between p-3">
                <label htmlFor="session" className="label-text text-base">
                  Session Name
                </label>
                <input
                  id="session"
                  className="input input-bordered input-info h-8"
                  placeholder="Session Name"
                />
              </div>
            </div>

            <div></div>
          </div>

          <div></div>
        </div>
      </div>
    </Navbar>
  );
}
