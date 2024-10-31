import { NextResponse } from "next/server"

import fs from "fs"

export async function GET() {
  fs.writeFile("subscription.json", JSON.stringify(""), (err) => {
    if (err) {
      console.error(err)
      return NextResponse.json(
        { success: false, error: "Failed to unsubscribe" },
        { status: 500 },
      )
    }
  })
  return NextResponse.json({ success: true }, { status: 200 })
}
