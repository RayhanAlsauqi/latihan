"use client"
import { setCookie } from "@/lib/cookies"
import { loginUser } from "@/services/auth.service"
import React, { createContext, useContext, useState } from "react"
import Cookies from "universal-cookie"


type LoginResponse = {
  accessToken: string
  refreshToken: string
  id: number
  username: string
  email: string
  image: string
}

type User = {
  id: number
  username: string
  email: string
  image: string
}

type AuthContextType = {
  user: User | null
  token: string | null
  isLoading: boolean
  isError: Error | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void

}
const cookies = new Cookies();
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(cookies.get("accessToken") || null)
  const [isError, setIsError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  
  const login = async (username: string, password: string) => {
    const payload = { username, password }
    setIsLoading(true)
    setIsError(null)

    try {
      const response: LoginResponse = await loginUser(payload);
      console.log("Login response:", response)
      if (response && response.accessToken && response.refreshToken) {
        const { accessToken, refreshToken, ...userData } = response
        setToken(accessToken)
        setCookie("accessToken", accessToken)
        setCookie("refreshToken", refreshToken)
        setUser(userData)
      }
    } catch (error) {
      setIsError(error as Error)
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null);
    setToken(null);
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
  }


  return (
    <AuthContext.Provider value={{ user, token, isError, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )



}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};