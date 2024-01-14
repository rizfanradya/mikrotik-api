import { retrieveData } from "@/utils/retrieveData";
import Image from "next/image";

export default async function LogoImage() {
  const fetchData: any = await retrieveData("logo");

  return (
    <div className="flex justify-center items-center h-56">
      <Image
        src={fetchData[0].logo}
        alt="logo"
        width={100}
        height={100}
        className="rounded-lg mb-4"
      />
    </div>
  );
}
