import AuthSession from "@/app/components/authSession";
import FormAddRouter from "./formAddRouter";

export default function AddRouter() {
  return (
    <AuthSession>
      <FormAddRouter />
    </AuthSession>
  );
}
