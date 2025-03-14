"use client"

import { UPDATE_USER } from "@/services/AuthService"
import type { IUser } from "@/types/IUser"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner, faCheck } from "@fortawesome/free-solid-svg-icons"

interface UserDetailsFormProps {
  user: IUser
}

export default function UserDetailsForm({ user }: UserDetailsFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      const response = await UPDATE_USER({
        firstName: formData.firstName,
        lastName: formData.lastName
      })
      if (response.success) {
        setSuccess(true)
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to update user:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* First Name Input */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-200 mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
            placeholder="Enter your first name"
          />
        </div>

        {/* Last Name Input */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-200 mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
            placeholder="Enter your last name"
          />
        </div>

        {/* Email Input (Disabled) */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full px-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent opacity-50 cursor-not-allowed transition-all duration-200"
            placeholder="Enter your email"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-end gap-4">
        {success && (
          <span className="text-green-400 text-sm flex items-center gap-2">
            <FontAwesomeIcon icon={faCheck} className="h-4 w-4" />
            Changes saved successfully
          </span>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`
            px-6 py-2.5 rounded-xl font-medium text-white
            bg-gradient-to-r from-purple-500 to-pink-500
            hover:from-purple-600 hover:to-pink-600
            focus:outline-none focus:ring-2 focus:ring-purple-500/50
            disabled:opacity-50 disabled:cursor-not-allowed
            transform hover:-translate-y-0.5 transition-all duration-200
            flex items-center gap-2
          `}
        >
          {loading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </form>
  )
}