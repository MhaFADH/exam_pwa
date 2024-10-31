import { Button } from "@/components/ui/button"
import axios from "axios"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

type Props = {
  message: string
  title: string
}

const SubscribeButton = ({ message, title }: Props) => {
  const sendNotification = async () => {
    try {
      await axios.post("/sendNotification", { message, title })
    } catch (error) {
      console.error("Error sending push notification:", error)
    }
  }

  return (
    <Button className="flex-1 ml-4" onClick={sendNotification}>
      Postuler maintenant
    </Button>
  )
}

export default SubscribeButton
