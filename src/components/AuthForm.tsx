'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { REGISTER_USER, LOGIN_USER, GET_COUNTRY } from "@/services/AuthService";
import GoogleIcon from "@/components/ui/GoogleIcon";
import { isProduction } from "@/utils/EnvUtils";
import BaseUrl from "@/constants/BaseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
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
    return <div className="skeleton w-80 h-96"></div>
  }

  return (
    <section className={className}>
      <h2 className="text-lg font-semibold mb-4 ml-2">{getFormTitle()}</h2>

      {type === 'login' && <form className="w-full flex flex-col gap-2" onSubmit={handleFormSubmit}>
        <label className="input input-bordered flex items-center gap-4">
          Email
          <input name="email" type="text" className="grow" placeholder="gokusan@gmail.com" />
        </label>
        {formErrors.email && <FormErrorMessage message={formErrors.email} size="sm" align="left" />}
        <label className="input input-bordered flex items-center gap-2">
          Password
          <input name="password" type="password" className="grow" placeholder="password" />
        </label>
        {formErrors.password && <FormErrorMessage message={formErrors.password} size="sm" align="left" />}

        {errorType === "invalid" && <FormErrorMessage message="Invalid email or password" />}
        {errorType === "not_found" && <FormErrorMessage message="Email not found, please register" />}
        {errorType === "generic" && <FormErrorMessage message="Something went wrong, please try again" />}

        <button type="submit" className="btn btn-primary mt-4">
          {
            isSubmitting ? (
              <FontAwesomeIcon icon={faSpinner} className="h-5 w-5 animate-spin" />
            ) : (
              'Login'
            )
          }
        </button>
      </form>}

      {type === 'register' && <form className="w-full flex flex-col gap-2" onSubmit={handleFormSubmit}>
        <label className="input input-bordered flex items-center gap-4">
          <span className="whitespace-nowrap">First Name</span>
          <input name="firstName" type="text" className="grow" placeholder="Son" />
        </label>
        {formErrors.firstName && <FormErrorMessage message={formErrors.firstName} size="sm" align="left" />}
        <label className="input input-bordered flex items-center gap-4">
          <span className="whitespace-nowrap">Last Name</span>
          <input name="lastName" type="text" className="grow" placeholder="Goku" />
        </label>
        {formErrors.lastName && <FormErrorMessage message={formErrors.lastName} size="sm" align="left" />}
        <label className="input input-bordered flex items-center gap-4">
          Email
          <input name="email" type="text" className="grow" placeholder="gokusan@gmail.com" />
        </label>
        {formErrors.email && <FormErrorMessage message={formErrors.email} size="sm" align="left" />}
        <label className="input input-bordered flex items-center gap-2">
          Password
          <input name="password" type="password" className="grow" placeholder="password" />
        </label>
        {formErrors.password && <FormErrorMessage message={formErrors.password} size="sm" align="left" />}

        {errorType === "duplicate" && <FormErrorMessage message="Email already in use" />}
        {errorType === "generic" && <FormErrorMessage message="Something went wrong, please try again" />}

        <button type="submit" className="btn btn-primary mt-2">
          {
            isSubmitting ? (
              <FontAwesomeIcon icon={faSpinner} className="h-5 w-5 animate-spin" />
            ) : (
              'Register'
            )
          }
        </button>
      </form>}

      <div className="oauth-ctas w-full mt-4">
        <button className="flex items-center justify-center font-medium rounded text-sm border border-neutral-500 gap-2.5 py-2.5 px-3 w-full bg-white text-black" onClick={handleGoogleSSO}>
          <GoogleIcon size="xs" />
          Sign in with Google
        </button>
      </div>

      <div className="mt-2 text-center link-hover link-secondary">
        {type === 'register' ? <Link href="/login">Already have an account?</Link> : <Link href="/register">Don&apos;t have an account?</Link>}
      </div>
    </section>
  )
}