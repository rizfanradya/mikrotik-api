import AuthSession from "@/app/components/authSession";
import Navbar from "@/app/components/navbar";
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
