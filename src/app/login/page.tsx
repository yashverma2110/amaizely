import { AuthForm } from "@/components/AuthForm";
import { Suspense } from "react";

export default function Login() {
  return (
    <main className="login-page h-screen flex justify-center items-center p-4">
      <div className="mockup-window glass drop-shadow-lg">
        <hr className="mx-1 border-neutral-300" />
        <div className="flex p-4 w-full max-w-sm">
          <Suspense fallback={<div className="skeleton w-80 h-96"></div>}>
            <AuthForm className="w-full" type="login" />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
