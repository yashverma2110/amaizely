'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { REGISTER_USER, LOGIN_USER, GET_COUNTRY } from "@/services/AuthService";
import GoogleIcon from "@/components/ui/GoogleIcon";
import { isProduction } from "@/utils/EnvUtils";
import BaseUrl from "@/constants/BaseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import FormErrorMessage from "./ui/FormErrorMessage";
import { isEmailValid, isStringValid } from "@/utils/StringUtils";

interface IAuthFormProps {
  type: "login" | "register";
  className?: string;
}

export function AuthForm({ type, className }: IAuthFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [errorType, setErrorType] = useState<"duplicate" | "invalid" | "not_found" | "generic" | "none">("none")
  const [country, setCountry] = useState<string>()
  const [isCountryLoading, setIsCountryLoading] = useState(true)

  useEffect(() => {
    GET_COUNTRY().then((response) => {
      setCountry(response.country)
    }).finally(() => {
      setIsCountryLoading(false)
    })
  }, [])

  const query = useSearchParams();
  const router = useRouter();

  function getFormTitle() {
    switch (type) {
      case "login":
        return "Log In";
      case "register":
        return "Register";
    }
  }

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (type === "login") {
      await handleLogin(event);
    } else {
      await handleSignUp(event);
    }
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    setErrorType("none")
    const formData = new FormData(event.currentTarget);
    const email = (formData.get("email") as string).toLowerCase();
    const password = formData.get("password") as string;

    if (!isEmailValid(email)) {
      setFormErrors({ email: "Invalid email" })
      return;
    }

    if (!isStringValid(password)) {
      setFormErrors({ password: "Password is required" })
      return;
    }

    setIsSubmitting(true)

    const response = await LOGIN_USER({ email, password });

    if (response.success) {
      if (query.get("redirect")) {
        router.push(query.get("redirect") as string);
        return;
      }

      router.push("/deck")
      return;
    }

    setIsSubmitting(false)

    if (response.status === 401) {
      setErrorType("invalid")
      return;
    }

    if (response.status === 404) {
      setErrorType("not_found")
      return;
    }

    setErrorType("generic")
  }

  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    setErrorType("none")
    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!isStringValid(firstName)) {
      setFormErrors({ firstName: "First name is required" })
      return;
    }

    if (!isStringValid(lastName)) {
      setFormErrors({ lastName: "Last name is required" })
      return;
    }

    if (!isEmailValid(email)) {
      setFormErrors({ email: "Invalid email" })
      return;
    }

    if (!isStringValid(password)) {
      setFormErrors({ password: "Password is required" })
      return;
    }

    setIsSubmitting(true)

    const response = await REGISTER_USER({ firstName, lastName, email, password });

    if (response.success) {
      router.push("/deck")
      return;
    }

    setIsSubmitting(false)

    if (response.status === 409) {
      setErrorType("duplicate")
      return;
    }

    setErrorType("generic")
  }

  function handleGoogleSSO() {
    const BASE_URL = isProduction() ? BaseUrl.PROD : BaseUrl.DEV
    const redirect = `${window.location.protocol}//${window.location.host}/deck`;
    let url = `${BASE_URL}/auth/google?redirect=${redirect}`

    if (country) {
      url += `&country=${country}`
    }

    if (type === "login") {
      window.location.href = url;
      return
    }

    window.location.href = url;
  }

  if (isCountryLoading) {
    return <div className="skeleton w-full h-96 rounded-xl bg-slate-700/50"></div>
  }

  return (
    <section className={className}>
      <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 text-lg font-semibold mb-4 ml-2">{getFormTitle()}</h2>

      {type === 'login' && <form className="w-full space-y-4" onSubmit={handleFormSubmit}>
        <div className="space-y-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 h-5 w-5" />
            </div>
            <input 
              name="email" 
              type="text" 
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200" 
              placeholder="Email address"
            />
          </div>
          {formErrors.email && <FormErrorMessage message={formErrors.email} size="sm" align="left" />}
        </div>

        <div className="space-y-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faLock} className="text-gray-400 h-5 w-5" />
            </div>
            <input 
              name="password" 
              type="password" 
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200" 
              placeholder="Password"
            />
          </div>
          {formErrors.password && <FormErrorMessage message={formErrors.password} size="sm" align="left" />}
        </div>

        {errorType === "invalid" && <FormErrorMessage message="Invalid email or password" />}
        {errorType === "not_found" && <FormErrorMessage message="Email not found, please register" />}
        {errorType === "generic" && <FormErrorMessage message="Something went wrong, please try again" />}

        <button 
          type="submit" 
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
        >
          {isSubmitting ? (
            <FontAwesomeIcon icon={faSpinner} className="h-5 w-5 animate-spin" />
          ) : (
            'Log In'
          )}
        </button>
      </form>}

      {type === 'register' && <form className="w-full space-y-4" onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-300 ml-2">First Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faUser} className="text-gray-400 h-5 w-5 group-hover:text-purple-400 transition-colors duration-200" />
              </div>
              <input 
                name="firstName" 
                type="text" 
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200" 
                placeholder="John"
              />
            </div>
            {formErrors.firstName && <FormErrorMessage message={formErrors.firstName} size="sm" align="left" />}
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300 ml-2">Last Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faUser} className="text-gray-400 h-5 w-5 group-hover:text-purple-400 transition-colors duration-200" />
              </div>
              <input 
                name="lastName" 
                type="text" 
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200" 
                placeholder="Doe"
              />
            </div>
            {formErrors.lastName && <FormErrorMessage message={formErrors.lastName} size="sm" align="left" />}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300 ml-2">Email Address</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 h-5 w-5 group-hover:text-purple-400 transition-colors duration-200" />
            </div>
            <input 
              name="email" 
              type="email" 
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200" 
              placeholder="john.doe@example.com"
            />
          </div>
          {formErrors.email && <FormErrorMessage message={formErrors.email} size="sm" align="left" />}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300 ml-2">Password</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faLock} className="text-gray-400 h-5 w-5 group-hover:text-purple-400 transition-colors duration-200" />
            </div>
            <input 
              name="password" 
              type="password" 
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200" 
              placeholder="••••••••"
            />
          </div>
          {formErrors.password && <FormErrorMessage message={formErrors.password} size="sm" align="left" />}
          <p className="text-xs text-gray-400 mt-1 ml-2">Must be at least 8 characters</p>
        </div>

        {errorType === "duplicate" && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <FormErrorMessage message="This email is already registered. Please try logging in instead." />
          </div>
        )}
        {errorType === "generic" && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <FormErrorMessage message="Something went wrong. Please try again later." />
          </div>
        )}

        <button 
          type="submit" 
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 mt-6"
        >
          {isSubmitting ? (
            <FontAwesomeIcon icon={faSpinner} className="h-5 w-5 animate-spin" />
          ) : (
            'Create Account'
          )}
        </button>
      </form>}

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 text-gray-400 bg-slate-800/50 backdrop-blur-lg rounded-full">Or continue with</span>
        </div>
      </div>

      <button 
        onClick={handleGoogleSSO}
        className="w-full py-3 px-4 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-3"
      >
        <GoogleIcon size="xs" />
        <span>Sign up with Google</span>
      </button>

      <div className="mt-6 text-center">
        <Link 
          href={type === 'register' ? '/login' : '/register'} 
          className="text-gray-300 hover:text-white transition-colors duration-200"
        >
          {type === 'register' ? (
            <span className="text-gray-400">Already have an account? <span className="text-purple-400 hover:text-purple-300 font-medium">Log in</span></span>
          ) : (
            <span className="text-gray-400">Don&apos;t have an account? <span className="text-purple-400 hover:text-purple-300 font-medium">Sign up</span></span>
          )}
        </Link>
      </div>
    </section>
  )
}