import RouterSettingsLayout from "./main";
import AuthSession from "@/app/components/authSession";

export default function settings() {
  <AuthSession>
    <RouterSettingsLayout />
  </AuthSession>;
}
