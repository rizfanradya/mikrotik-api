import AuthSession from "@/app/components/authSession";
import FormAddRouter from "./formAddRouter";
import Navbar from "@/app/components/navbar";

export default function AddRouter() {
  return (
    <AuthSession>
      <Navbar title="Add Router">
        <FormAddRouter />
      </Navbar>
    </AuthSession>
  );
}
