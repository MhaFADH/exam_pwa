import { NextResponse, type NextRequest } from "next/server"

import fs from "fs"

export async function POST(req: NextRequest) {
  const sub: PushSubscriptionJSON | null = await req.json()
  console.log("hello")

  if (!sub) {
    return NextResponse.json(
      { success: false, error: "Subscription data is required" },
      { status: 400 },
    )
  }

  fs.writeFile("subscription.json", JSON.stringify(sub), (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
  return NextResponse.json({ success: true }, { status: 200 })
}
