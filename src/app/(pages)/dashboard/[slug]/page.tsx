import AuthSession from "@/app/components/authSession";
import NavbarSession from "@/app/components/navbarSession";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function dashboard({ params }: any) {
  const docRef = doc(db, "router", params.slug);
  const docSnap: any = await getDoc(docRef);
  const data = docSnap.data();

  return (
    <AuthSession>
      <NavbarSession title={data.sessionName} session={params.slug}>
        <>dashboard router</>
      </NavbarSession>
    </AuthSession>
  );
}
