import { AuthForm } from "@/components/AuthForm";
import { Suspense } from "react";
import Image from "next/image";

export default function Register() {
  return (
    <main className="register-page min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>

      {/* Blob Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-lg">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image 
              src="https://res.cloudinary.com/dd2ntmm1w/image/upload/v1731002279/logo_s5wgbq.png" 
              alt="am(AI)zely" 
              width={48}
              height={48}
              className="transition-transform duration-300 hover:scale-110" 
            />
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
              am(AI)zely
            </span>
          </div>
          <p className="text-gray-300 text-lg">Create your account and start your learning journey!</p>
          <p className="text-gray-400 text-sm mt-2">Join thousands of students using AI to learn effectively.</p>
        </div>

        {/* Auth Form */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl p-8">
          <Suspense fallback={<div className="skeleton w-full h-[520px]"></div>}>
            <AuthForm className="w-full" type="register" />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
