import { FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { BsCpuFill } from "react-icons/bs";

export default function RouterInfo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
      <div className="flex gap-1 items-center rounded-md p-2 text-white bg-slate-700 relative">
        <div className="w-12 relative flex justify-center items-center">
          <FaCalendarAlt size="2.5em" />
        </div>
        <div className="text-xs grid gap-1">
          <p>System date & time</p>
          <p>-</p>
          <p>-</p>
        </div>
      </div>

      <div className="flex gap-1 items-center rounded-md p-2 text-white bg-slate-700 relative">
        <div className="w-12 relative flex justify-center items-center">
          <FaInfoCircle size="2.5em" />
        </div>
        <div className="text-xs grid gap-1">
          <p>Board Name : -</p>
          <p>Model : -</p>
          <p>Router OS : -</p>
        </div>
      </div>

      <div className="flex gap-1 items-center rounded-md p-2 text-white bg-slate-700 relative">
        <div className="w-12 relative flex justify-center items-center">
          <BsCpuFill size="2.5em" />
        </div>
        <div className="text-xs grid gap-1">
          <p>CPU Load : -</p>
          <p>Free Memory : -</p>
          <p>Free HDD : -</p>
        </div>
      </div>

      <div className="flex gap-1 items-center rounded-md p-2 text-white bg-slate-700 relative">
        <div className="w-12 relative flex justify-center items-center">
          <FaMoneyBill1Wave size="2.5em" />
        </div>
        <div className="text-xs grid gap-1">
          <p>Income</p>
          <p>Today vcr : Rp -</p>
          <p>This month -vcr : Rp -</p>
        </div>
      </div>
    </div>
  );
}
