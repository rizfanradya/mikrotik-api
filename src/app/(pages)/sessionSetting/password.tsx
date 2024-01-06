"use client";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function PasswordSessionSetting() {
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const controlSeePassword = () => {
    setSeePassword(!seePassword);
  };

  return (
    <div className="flex items-center gap-3">
      <input
        id="password"
        className="input input-bordered input-info w-full"
        placeholder="Password"
        required
        type={seePassword ? "text" : "password"}
      />
      <span onClick={() => controlSeePassword()}>
        {seePassword ? <FaEyeSlash size="1.5em" /> : <FaEye size="1.5em" />}
      </span>
    </div>
  );
}
