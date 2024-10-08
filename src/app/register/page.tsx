import { AuthForm } from "@/components/AuthForm";
import { Suspense } from "react";

export default function Register() {
  return (
    <main className="register-page h-screen flex justify-center items-center p-4">
      <div className="mockup-window shadow-lg border border-gray-400">
        <div className="flex p-4 border-t border-gray-400">
          <Suspense fallback={<div className="skeleton w-full h-96"></div>}>
            <AuthForm className="w-full" type="register" />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
