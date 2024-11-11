"use client"

import { useAuthContext } from "@/app/context/auth.context"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login() {
  const { login, isLoading, isError } = useAuthContext()
  const router = useRouter()

  const [payload, setPayload] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setPayload((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted with data:", payload)
    try {
      await login(payload.username, payload.password)
      router.push("/products")
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={payload.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={payload.password}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Login</button>

      {isLoading && <p>Loading...</p>}
      {isError && <p style={{ color: 'red' }}>Login failed. Please try again.</p>}
    </form>
  )


} 