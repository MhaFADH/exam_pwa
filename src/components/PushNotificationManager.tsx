"use client"
import { useEffect, useState } from "react"
import axios from "axios"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)

  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .replace(/\s/g, "")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const PushNotificationManager = () => {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  )
  const [message, setMessage] = useState("")

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    })
    const sub = await registration.pushManager.getSubscription()
    setSubscription(sub)

    if (sub) {
      await axios.post("/subscribe", { sub: sub.toJSON() })
    }
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      ),
    })
    setSubscription(sub)
    axios.post("/subscribe", { sub: sub.toJSON() })
    //await subscribeUser(sub.toJSON())
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe()
    setSubscription(null)
    await axios.get("/unsubscribe")
  }

  async function sendTestNotification() {
    if (subscription) {
      await axios.post("/sendNotification", { message })
      setMessage("")
    }
  }

  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>
  }

  function getNotification() {
    Notification.requestPermission().then((result) => {
      if (result === "granted") {
        const notifTitle = "Go get it"
        const notifBody = `Created by no one.`
        const notifImg = `./favicon.ico`
        const options = {
          body: notifBody,
          icon: notifImg,
        }
        new Notification(notifTitle, options)
        setTimeout(getNotification, 30000)
      }
    })
  }

  return (
    <div>
      <h3>Push Notifications</h3>
      {subscription ? (
        <>
          <p>You are subscribed to push notifications.</p>
          <button onClick={unsubscribeFromPush}>Unsubscribe</button>
          <input
            type="text"
            placeholder="Enter notification message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendTestNotification}>Send Test</button>
        </>
      ) : (
        <>
          <p>You are not subscribed to push notifications.</p>
          <button onClick={subscribeToPush}>Subscribe</button>
        </>
      )}
      <button onClick={getNotification}>send Notification</button>
    </div>
  )
}

export default PushNotificationManager
