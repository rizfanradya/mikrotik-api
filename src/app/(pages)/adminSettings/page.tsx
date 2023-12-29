import Navbar from "@/app/navbar";
import { FaServer } from "react-icons/fa";

const data = [{ hotspotName: "hotspot1", sessionName: "session1" }];

export default function AdminSettings() {
  return (
    <Navbar title="Admin Settings">
      <div className="card shadow-xl bg-base-100 p-4">
        <p className="card-title">
          <FaServer /> Router List
        </p>

        <div>
          {data.map((data, index) => (
            <div key={index}>
              <FaServer />
              <div>
                <p>Hotspot Name : {data.hotspotName}</p>
                <p>Session Name : {data.sessionName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Navbar>
  );
}
