import AuthSession from "@/app/components/authSession";
import Navbar from "@/app/navbar";
import FormAdminSettings from "./formAdminSettings";

export default function AdminSettings() {
  return (
    <AuthSession>
      <Navbar title="Admin Settings">
        <FormAdminSettings />
      </Navbar>
    </AuthSession>
  );
}
