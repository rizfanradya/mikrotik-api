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

        <div className="p-3 grid gap-4">
          <div className="grid gap-4">
            <div className="border-slate-800 border-2 overflow-hidden rounded-lg">
              <h1 className="bg-slate-800 p-3 font-semibold">Session</h1>

              <TextInput data="Session Name" type="text" />
            </div>

            <div className="border-slate-800 border-2 overflow-hidden rounded-lg">
              <h1 className="bg-slate-800 p-3 font-semibold">MikroTik</h1>

              <div>
                <TextInput data="Ip Mikrotik" type="text" />
                <TextInput data="Username" type="text" />
                <div className="p-2">
                  <label htmlFor="password" className="label-text text-base">
                    Password
                  </label>
                  <PasswordSessionSetting />
                </div>
              </div>
            </div>

            <div className="border-slate-800 border-2 overflow-hidden rounded-lg">
              <h1 className="bg-slate-800 p-3 font-semibold">Data</h1>

              <div>
                <TextInput data="Hotspot Name" type="text" />
                <TextInput data="DNS Name" type="text" />
                <TextInput data="Currency (RP)" type="text" />
                <TextInput data="Auto Load (SEC)" type="text" />
                <TextInput data="Idle Timeout" type="text" />
                <TextInput data="Traffic Interface" type="text" />
                <TextInput data="Life Report" type="text" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button className="btn btn-info text-white">Save</button>
              <button className="btn btn-success text-white">Connect</button>
              <button className="btn btn-warning text-white">Ping</button>
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </Navbar>
  );
}
