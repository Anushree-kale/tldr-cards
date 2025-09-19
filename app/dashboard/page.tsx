// app/dashboard/page.tsx
"use client"

import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"

export default function DashboardPage() {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/login")
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2">You are logged in 🎉</p>
      <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg">
        Logout
      </button>
    </div>
  )
}
