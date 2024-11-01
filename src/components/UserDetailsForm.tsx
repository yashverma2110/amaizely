"use client"

import { UPDATE_USER } from "@/services/AuthService"
import type { IUser } from "@/types/IUser"
import { useState } from "react"

interface IUserDetailsFormProps {
  user: IUser
}
export default function UserDetailsForm({ user }: IUserDetailsFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    const formData = new FormData(event.target as HTMLFormElement)
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string

    await UPDATE_USER({ firstName, lastName })
    setIsLoading(false)
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <label className="input input-bordered flex items-center gap-4">
        <span className="whitespace-nowrap">First Name</span>
        <input name="firstName" type="text" autoComplete="off" defaultValue={user.firstName || ''} className="grow" placeholder="Son" />
      </label>
      <label className="input input-bordered flex items-center gap-4">
        <span className="whitespace-nowrap">Last Name</span>
        <input name="lastName" type="text" autoComplete="off" defaultValue={user.lastName || ''} className="grow" placeholder="Goku" />
      </label>
      <label className="input input-bordered flex items-center gap-4">
        Email
        <input disabled name="email" type="text" defaultValue={user.email} className="grow" placeholder="gokusan@gmail.com" />
      </label>

      <button type="submit" className="w-full btn btn-primary mt-4">{isLoading ? 'Updating...' : 'Update'}</button>
    </form>
  )
}