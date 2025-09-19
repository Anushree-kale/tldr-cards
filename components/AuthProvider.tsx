"use client"

import { type ReactNode, useEffect, useState, createContext, useContext } from "react"
import { onAuthStateChanged, type User } from "firebase/auth"
import { auth } from "@/lib/firebase"

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true })

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      setLoading(false)

      // Set auth token in cookie for middleware
      if (user) {
        const token = await user.getIdToken()
        document.cookie = `firebaseAuthToken=${token}; path=/; max-age=3600`
      } else {
        document.cookie = "firebaseAuthToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
      }
    })
    return () => unsub()
  }, [])

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}
