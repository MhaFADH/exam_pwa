import { NextResponse, type NextRequest } from "next/server"
import fs from "fs"
import webpush, { PushSubscription } from "web-push"

webpush.setVapidDetails(
  "mailto:mail@example.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
)

export async function POST(req: NextRequest) {
  const { message, title }: { message: string | null; title: string | null } =
    await req.json()

  if (!message) {
    return NextResponse.json(
      { success: false, error: "Message is required" },
      { status: 400 },
    )
  }

  const { sub } = JSON.parse(fs.readFileSync("subscription.json", "utf-8"))

  try {
    await webpush.sendNotification(
      sub as PushSubscription,
      JSON.stringify({
        title,
        body: message,
      }),
    )

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error sending push notification:", error)
    return NextResponse.json(
      { success: false, error: "Failed to send notification" },
      { status: 500 },
    )
  }
}
