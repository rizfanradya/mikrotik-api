import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";

export function retrieveData(collectionName: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [dataRouter, setDataRouter] = useState<any>(null);

  const YourComponent = () => {
    useEffect(() => {
      const unsub = onSnapshot(
        collection(db, collectionName),
        (querySnapshot) => {
          const data: any = [];
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          });
          setDataRouter(data);
        }
      );

      return () => {
        unsub();
      };
    }, []);
  };
  YourComponent();

  return dataRouter;
}
