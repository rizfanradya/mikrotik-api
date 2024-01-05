import Navbar from "@/app/navbar";
import { redirect } from "next/navigation";

export default function Logout() {
  redirect("/login");

  return <Navbar title="Logout">Logout</Navbar>;
}
