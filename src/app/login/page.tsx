import { AuthForm } from "@/components/AuthForm";
import { Suspense } from "react";
import Image from "next/image";

export default function Login() {
  return (
    <main className="login-page min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>

      {/* Blob Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
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
          <p className="text-gray-300 text-lg">Welcome back! Log in to continue your learning journey.</p>
        </div>

        {/* Auth Form */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl p-8">
          <Suspense fallback={
            <div className="w-full space-y-6 animate-pulse">
              {/* Form Title Skeleton */}
              <div className="h-7 w-24 bg-slate-700/50 rounded-lg"></div>

              {/* Input Fields Skeleton */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-slate-700/30 rounded-md"></div>
                  <div className="h-12 bg-slate-700/50 rounded-xl"></div>
                </div>

                <div className="space-y-2">
                  <div className="h-4 w-20 bg-slate-700/30 rounded-md"></div>
                  <div className="h-12 bg-slate-700/50 rounded-xl"></div>
                </div>
              </div>

              {/* Button Skeleton */}
              <div className="h-12 bg-gradient-to-r from-purple-600/40 to-blue-600/40 rounded-xl mt-6"></div>

              {/* Divider Skeleton */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center">
                  <div className="h-6 w-32 bg-slate-700/50 rounded-full"></div>
                </div>
              </div>

              {/* Google Button Skeleton */}
              <div className="h-12 bg-slate-200/50 rounded-xl"></div>

              {/* Link Skeleton */}
              <div className="mt-6 flex justify-center">
                <div className="h-4 w-48 bg-slate-700/30 rounded-md"></div>
              </div>
            </div>
          }>
            <AuthForm className="w-full" type="login" />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
