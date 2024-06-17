import { AuthForm } from "@/components/AuthForm";

export default function Login() {
  return (
    <main className="login-page min-h-screen p-4">
      <div className="mockup-window border h-full border-gray-400">
        <div className="flex p-4 border-t border-gray-400">
          <AuthForm className="w-full" type="login" />
        </div>
      </div>
    </main>
  );
}
