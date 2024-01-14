import AuthSession from "@/app/components/authSession";
import NavbarSession from "@/app/components/navbarSession";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import RouterInfo from "./routerInfo";
import HotspotInfo from "./hotspotInfo";

export default async function dashboard({ params }: any) {
  const docRef = doc(db, "router", params.slug);
  const docSnap: any = await getDoc(docRef);
  const data = docSnap.data();

  return (
    <AuthSession>
      <NavbarSession title={data.sessionName} session={params.slug}>
        <RouterInfo />
        <HotspotInfo />
      </NavbarSession>
    </AuthSession>
  );
}
