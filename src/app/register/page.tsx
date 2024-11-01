import { AuthForm } from "@/components/AuthForm";
import { Suspense } from "react";

export default function Register() {
  return (
    <main className="register-page h-screen flex justify-center items-center p-4">
      <div className="mockup-window glass drop-shadow-lg">
        <hr className="mx-1 border-neutral-300" />
        <div className="flex p-4">
          <Suspense fallback={<div className="skeleton w-80 h-96"></div>}>
            <AuthForm className="w-full" type="register" />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
