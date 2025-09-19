import { type NextRequest, NextResponse } from "next/server"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "@/lib/firebase"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Create a reference to the file in Firebase Storage
    const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`)

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload file to Firebase Storage
    await uploadBytes(storageRef, buffer)

    // Get download URL
    const downloadURL = await getDownloadURL(storageRef)

    return NextResponse.json({
      success: true,
      url: downloadURL,
      filename: file.name,
      size: file.size,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
