import AuthSession from "@/app/components/authSession";
import ListRouter from "./listRouter";

export default function RouterList() {
  return (
    <AuthSession>
      <ListRouter />
    </AuthSession>
  );
}
