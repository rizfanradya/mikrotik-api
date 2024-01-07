"use client";
import Navbar from "@/app/navbar";
import Link from "next/link";
import { FaServer, FaExternalLinkAlt, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { signIn, useSession } from "next-auth/react";
import LoadingSpinner from "@/app/components/loading";

const data = [{ hotspotName: "hotspot1", sessionName: "session1" }];

export default function RouterSettings() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (!session) {
    return (
      <div className="w-screen h-screen p-4 text-center text-2xl font-semibold tracking-wider text-white grid justify-center items-center">
        <p>ANDA HARUS LOGIN TERLEBIH DAHULU</p>
        <button onClick={() => signIn()} className="btn btn-outline btn-info">
          LOGIN
        </button>
      </div>
    );
  }

  return (
    <Navbar title="Router Settings">
      <div className="card shadow-xl bg-base-100 p-4">
        <p className="card-title">
          <FaServer /> Router List
        </p>

        <div>
          {data.map((data, index) => (
            <div key={index} className="flex justify-between items-center">
              <FaServer />
              <div>
                <div>
                  <p>Hotspot Name : {data.hotspotName}</p>
                  <p>Session Name : {data.sessionName}</p>
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
      </div>
    </Navbar>
  );
}
