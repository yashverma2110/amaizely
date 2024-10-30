'use client';

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { REGISTER_USER, LOGIN_USER } from "@/services/AuthService";
import GoogleIcon from "@/components/ui/GoogleIcon";

interface IAuthFormProps {
  type: "login" | "register";
  className?: string;
}
export function AuthForm({ type, className }: IAuthFormProps) {
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
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await LOGIN_USER({ email, password });

    if (response.success) {
      if (query.get("redirect")) {
        router.push(query.get("redirect") as string);
        return;
      }

      router.push("/deck")
    }
  }

  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await REGISTER_USER({ firstName, lastName, email, password });

    if (response.success) {
      router.push("/deck")
    }
  }

  function handleGoogleSSO() {
    const redirect = `${window.location.protocol}//${window.location.host}/deck`;
    if (type === "login") {
      window.location.href = `http://localhost:8080/auth/google?redirect=${redirect}`;
      return
    }

    window.location.href = `http://localhost:8080/auth/google?redirect=${redirect}`;
  }

  return (
    <section className={className}>
      <h2 className="text-lg font-semibold mb-4 ml-2">{getFormTitle()}</h2>

      {type === 'login' && <form className="w-full flex flex-col gap-2" onSubmit={handleFormSubmit}>
        <label className="input input-bordered flex items-center gap-4">
          Email
          <input name="email" type="text" className="grow" placeholder="gokusan@gmail.com" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Password
          <input name="password" type="password" className="grow" placeholder="password" />
        </label>

        <button type="submit" className="btn btn-primary mt-4">Login</button>
      </form>}

      {type === 'register' && <form className="w-full flex flex-col gap-2" onSubmit={handleFormSubmit}>
        <label className="input input-bordered flex items-center gap-4">
          <span className="whitespace-nowrap">First Name</span>
          <input name="firstName" type="text" className="grow" placeholder="Son" />
        </label>
        <label className="input input-bordered flex items-center gap-4">
          <span className="whitespace-nowrap">Last Name</span>
          <input name="lastName" type="text" className="grow" placeholder="Goku" />
        </label>
        <label className="input input-bordered flex items-center gap-4">
          Email
          <input name="email" type="text" className="grow" placeholder="gokusan@gmail.com" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Password
          <input name="password" type="password" className="grow" placeholder="password" />
        </label>

        <button type="submit" className="btn btn-primary mt-4">Register</button>
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