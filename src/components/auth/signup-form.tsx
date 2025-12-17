"use client"

import type React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowRight, Mail } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { apiClient } from "@/lib/api-client"

export function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    acceptTerms: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")
    if (!formData.acceptTerms) {
      setError("You must accept the terms and conditions.")
      setLoading(false)
      return
    }

    try {
      const { data, error, status } = await apiClient.post<{ message: string }>("/api/auth/signup", {
        accept_terms: formData.acceptTerms,
        email: formData.email,
        full_name: formData.fullName,
        password: formData.password,
        phone: formData.phone,
      }, { requiresAuth: false })

      if (status === 201 || status === 200) {
        setSuccess(data?.message || "Signup successful!")
        console.log("Signup successful")
        router.push("/login")
      } else {
        setError(error || "Signup Failed")
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred"
      setError(errorMessage)
      console.error("Signup error", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md w-full mx-auto rounded-xl p-4 md:p-8 shadow-lg bg-gray-950 border border-gray-800">
      <h2 className="font-bold text-2xl text-white">Join CompetitorHUB</h2>
      <p className="text-gray-400 text-sm max-w-sm mt-2">
        Create your account and start tracking your competitors today
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="fullName" className="text-white">
            Full name
          </Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700 text-white focus-visible:ring-purple-500"
            required
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="text-white">
            Email Address
          </Label>
          <Input
            id="email"
            placeholder="john.doe@example.com"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700 text-white focus-visible:ring-purple-500"
            required
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="phone" className="text-white">
            Phone
          </Label>
          <Input
            id="phone"
            placeholder="+1234567890"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700 text-white focus-visible:ring-purple-500"
            required
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-6">
          <Label htmlFor="password" className="text-white">
            Password
          </Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700 text-white focus-visible:ring-purple-500"
            required
            minLength={8}
          />
        </LabelInputContainer>

        <div className="flex items-center space-x-2 mb-6">
          <Checkbox
            id="acceptTerms"
            checked={formData.acceptTerms}
            onCheckedChange={(checked: boolean) =>
              setFormData((prev) => ({ ...prev, acceptTerms: checked }))
            }
            className="border-gray-700 data-[state=checked]:bg-purple-600"
          />
          <label
            htmlFor="acceptTerms"
            className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the{" "}
            <Link
              href="#"
              className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
            >
              terms and conditions
            </Link>
          </label>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        <Button
          className="relative w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 group"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign up"}
          <ArrowRight className="ml-2 h-4 w-4" />
          <BottomGradient />
        </Button>

        <div className="bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <Button
            variant="outline"
            className="relative flex space-x-2 items-center justify-center w-full border-gray-700 bg-gray-900 text-white hover:bg-gray-800 hover:border-purple-500/50 transition-all duration-300 group"
            type="button"
          >
            <Mail className="h-4 w-4 text-purple-400" />
            <span>Continue with Google</span>
            <BottomGradient />
          </Button>
        </div>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-400">Already have an account?</span>{" "}
          <Link
            href="/login"
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      <span className="group-hover:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
    </>
  )
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  )
}

