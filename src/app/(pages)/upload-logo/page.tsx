import AuthSession from "@/app/components/authSession";
import Navbar from "@/app/components/navbar";
import FormUploadLogo from "./formUploadLogo";

export default function UploadLogo() {
  return (
    <AuthSession>
      <Navbar title="Upload Logo">
        <FormUploadLogo />
      </Navbar>
    </AuthSession>
  );
}
