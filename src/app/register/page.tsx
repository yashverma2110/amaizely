import { AuthForm } from "@/components/AuthForm";

export default function Register() {
  return (
    <main className="register-page h-screen flex justify-center items-center p-4">
      <div className="mockup-window shadow-lg border border-gray-400">
        <div className="flex p-4 border-t border-gray-400">
          <AuthForm className="w-full" type="register" />
        </div>
      </div>
    </main>
  );
}
