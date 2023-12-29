import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";

export default function Login() {
  return (
    <div className="h-screen p-6">
      <Card className="max-w-sm m-auto translate-y-2/4">
        <p className="text-slate-700 text-center font-semibold text-2xl">
          LOGIN
        </p>
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Username" />
            </div>
            <TextInput
              id="email1"
              type="text"
              placeholder="Username"
              required
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
            />
          </div>

          <Button type="submit">Login</Button>
        </form>
      </Card>
    </div>
  );
}
