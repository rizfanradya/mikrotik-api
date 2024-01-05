"use client";
import { Card, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<Inputs>();
  const router = useRouter();

  const handleLogin: SubmitHandler<Inputs> = (e) => {
    const username = "mikhmon";
    const password = "1234";

    if (e.username === username) {
      if (e.password === password) {
        router.push("/");
      } else {
        alert("password salah");
      }
    } else {
      alert("username tidak ditemukan");
    }
  };

  return (
    <div className="h-screen p-6">
      <Card className="max-w-sm m-auto translate-y-2/4">
        <p className="text-slate-700 text-center font-semibold text-2xl">
          LOGIN
        </p>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-4"
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Username" />
            </div>
            <TextInput
              id="email1"
              type="text"
              placeholder="Username"
              required
              {...register("username", { required: true })}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              placeholder="Password"
              required
              {...register("password", { required: true })}
            />
          </div>

          <button className="btn btn-info" type="submit">
            Login
          </button>
        </form>
      </Card>
    </div>
  );
}
