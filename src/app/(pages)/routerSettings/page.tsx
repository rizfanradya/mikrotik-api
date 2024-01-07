import Navbar from "@/app/navbar";
import Link from "next/link";
import { FaServer, FaExternalLinkAlt, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const data = [{ hotspotName: "hotspot1", sessionName: "session1" }];

export default function RouterSettings() {
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
