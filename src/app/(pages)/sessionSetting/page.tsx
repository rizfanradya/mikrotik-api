import Navbar from "@/app/navbar";
import { IoMdSettings } from "react-icons/io";
import PasswordSessionSetting from "./password";
import TextInput from "@/app/components/textInput";

export default function SessionSetting() {
  return (
    <Navbar title="Session Settings">
      <div className="bg-slate-700 text-white rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 font-semibold bg-slate-800 p-3">
          <IoMdSettings size="1.5em" />
          <h1>Session Settings</h1>
        </div>

        <form className="grid md:grid-cols-2 gap-4 p-3">
          <div className="grid gap-4">
            <div className="border-slate-800 border-2 overflow-hidden rounded-lg">
              <h1 className="bg-slate-800 p-3 font-semibold">Session</h1>

              <TextInput data="Session Name" type="text" />
            </div>

            <div className="border-slate-800 border-2 overflow-hidden rounded-lg">
              <h1 className="bg-slate-800 p-3 font-semibold">MikroTik</h1>

              <TextInput data="Ip Mikrotik" type="text" />
              <TextInput data="Username" type="text" />
              <div className="p-2 md:grid md:grid-cols-2 items-center">
                <label
                  htmlFor="password"
                  className="label-text text-sm font-semibold"
                >
                  Password
                </label>
                <PasswordSessionSetting />
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

            <TextInput data="Hotspot Name" type="text" />
            <TextInput data="DNS Name" type="text" />
            <TextInput data="Currency (RP)" type="number" />

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
                <option selected>10</option>
                <option>5</option>
                <option>30</option>
                <option>60</option>
                <option>Disable</option>
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
                <option selected>Enable</option>
                <option>Disable</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </Navbar>
  );
}
