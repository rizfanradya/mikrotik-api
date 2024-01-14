import AuthSession from "@/app/components/authSession";
import LoadingSpinner from "@/app/components/loading";
import Navbar from "@/app/components/navbar";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import FormEditRouter from "./formEditRouter";

export default async function editRouter({ params }: any) {
  const docRef = doc(db, "router", params.slug);
  const docSnap: any = await getDoc(docRef);
  const data = docSnap.data();

  return (
    <AuthSession>
      <Navbar title={`Edit session : ${data.sessionName}`}>
        {data ? (
          <FormEditRouter
            dataId={params.slug}
            sessionName={data.sessionName}
            ipMikrotik={data.ipMikrotik}
            username={data.username}
            password={data.password}
            hotspotName={data.hotspotName}
            dnsName={data.dnsName}
            currency={data.currency}
            autoLoad={data.autoLoad}
            idleTimeout={data.idleTimeout}
            trafficInterface={data.trafficInterface}
            lifeReport={data.lifeReport}
          />
        ) : (
          <LoadingSpinner />
        )}
      </Navbar>
    </AuthSession>
  );
}
