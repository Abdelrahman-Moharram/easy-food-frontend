// message.ts
import { toast } from "react-toastify"
import Announcement from "./Announcement";

type MessageType = "success" | "error" | "info" | "warning"
type DisplayType = "toast" | "normal"

export const showMessage = (
  display: DisplayType,
  type: MessageType,
  message: string
) => {
  if (display === "toast") {
    switch (type) {
      case "success": toast.success(message); break
      case "error": toast.error(message); break
      case "warning": toast.warn(message); break
    }
  } else {
    // container ثابت في الـ DOM
    // let container = document.getElementById("message-container")
    // if (!container) {
    //   container = document.createElement("div")
    //   container.id = "message-container"
    //   container.style.position = "fixed"
    //   container.style.top = "10px"
    //   container.style.right = "10px"
    //   container.style.zIndex = "9999"
    //   document.body.appendChild(container)
    // }

    // // div للرسالة
    // const msg = document.createElement("div")
    // msg.innerText = message
    // msg.style.marginTop = "130px"
    // msg.style.marginRight="800px"
    // msg.style.padding = "10px 15px"
    // msg.style.borderRadius = "6px"
    // msg.style.color = "white"
    // msg.style.fontWeight = "bold"
    // msg.style.background =
    //   type === "error"
    //     ? "crimson"
    //     : type === "success"
    //     ? "seagreen"
    //     : "orange"

    // container.appendChild(msg)

    // // يختفي بعد 3 ثواني
    // setTimeout(() => {
    //   msg.remove()
    // }, 3000)
    console.log('====================================');
    console.log('erer');
    console.log('====================================');
    return(
      <Announcement>
        <div className="flex items-center gap-5 text-red-500">
          <div className='font-semibold '>
            {message}
          </div>
        </div>
      </Announcement>
    )
  }
}
