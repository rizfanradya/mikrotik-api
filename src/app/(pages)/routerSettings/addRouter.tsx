import { FaEye, FaEyeSlash, FaRegCheckCircle } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { GiCancel } from "react-icons/gi";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

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
  const { register, handleSubmit } = useForm<Inputs>();
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [buttonSubmit, setButtonSubmit] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>();
  const [toastSuccess, setToastSuccess] = useState<boolean>(false);
  const [toastFailed, setToastFailed] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = async (e) => {
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
      setModalOpen(false);
      setToastSuccess(true);
      setTimeout(() => setToastSuccess(false), 3000);
    } catch (e) {
      setButtonSubmit(false);
      setModalOpen(false);
      setToastFailed(true);
      setTimeout(() => setToastFailed(false), 3000);
    }
  };

  return (
    <>
      {/* toast */}
      {toastSuccess && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success font-semibold flex justify-center items-center text-white">
            <FaRegCheckCircle size="1.5em" /> Data Berhasil Ditambahkan
          </div>
        </div>
      )}

      {toastFailed && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error font-semibold flex justify-center items-center text-white">
            <GiCancel size="1.5em" /> Data Gagal Ditambahkan
          </div>
        </div>
      )}
      {/* toast */}

      <label htmlFor="my_modal_7" className="btn btn-accent text-white mb-3">
        <IoMdAddCircle size="1.5em" /> Add Router
      </label>

      <input
        type="checkbox"
        id="my_modal_7"
        className="modal-toggle"
        checked={modalOpen}
      />
      <div className="modal" role="dialog">
        <div className="modal-box w-11/12 max-w-5xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid md:grid-cols-2 gap-4 text-white"
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
                      onClick={() => setSeePassword(!seePassword)}
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
              <div className="grid grid-cols-2 gap-4">
                {buttonSubmit ? (
                  <div className="btn btn-neutral">
                    <span className="loading loading-spinner"></span>
                  </div>
                ) : (
                  <button className="btn btn-success text-white">Save</button>
                )}

                <label
                  htmlFor="my_modal_7"
                  className="btn btn-warning text-white"
                >
                  close
                </label>
              </div>
            </div>
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

        <label
          className="modal-backdrop cursor-pointer"
          htmlFor="my_modal_7"
        ></label>
      </div>
    </>
  );
}
