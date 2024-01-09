"use client";
import LoadingSpinner from "@/app/components/loading";
import Navbar from "@/app/navbar";
import { retrieveData } from "@/utils/retrieveData";
import Link from "next/link";
import randomColor from "randomcolor";
import { FaServer, FaExternalLinkAlt, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function RouterSettingsLayout() {
  const dataRouter = retrieveData("router");

  return (
    <Navbar title="Router Settings">
      <div className="border-primary border-2 overflow-hidden rounded-lg bg-base-200">
        <h1 className="bg-primary p-1 font-semibold text-white">Router List</h1>

        {dataRouter ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {dataRouter.map((doc: any) => (
              <div
                key={doc.id}
                style={{
                  backgroundColor: randomColor({ luminosity: "bright" }),
                }}
                className={`flex gap-4 items-center m-2 rounded-lg p-3 text-white`}
              >
                <div className="w-16">
                  <FaServer size="full" />
                </div>
                <div>
                  <div className="text-sm">
                    <p>Hotspot Name : {doc.hotspotName}</p>
                    <p>Session Name : {doc.sessionName}</p>
                  </div>

                  <div className="flex gap-2">
                    <Link className="badge badge-accent" href={"/"}>
                      <FaExternalLinkAlt />
                      Open
                    </Link>
                    <Link className="badge badge-primary" href={"/"}>
                      <FaEdit />
                      Edit
                    </Link>
                    <Link className="badge-error badge" href={"/"}>
                      <MdDelete />
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center p-4">
            <div className="loading loading-spinner text-info w-14"></div>
          </div>
        )}
      </div>
    </Navbar>
  );
}
