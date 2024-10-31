import { Button, ButtonProps } from "@/components/ui/button"
import axios from "axios"
import { ReactNode } from "react"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

type Props = {
  message: string
  title: string
  children: ReactNode
  className: string
  type?: ButtonProps["type"]
}

const SubscribeButton = ({ message, title, children, ...props }: Props) => {
  const sendNotification = async () => {
    try {
      await axios.post("/sendNotification", { message, title })
    } catch (error) {
      console.error("Error sending push notification:", error)
    }
  }

  return (
    <Button onClick={sendNotification} {...props}>
      {children}
    </Button>
  )
}

export default SubscribeButton
