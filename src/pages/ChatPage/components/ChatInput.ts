import "./ChatInput.style.scss"
import { dc, sanitizeInput } from "@/helpers/helpers"

export const InputWrapper = (
  data: any,
  renderList: (firstRender: boolean) => void,
) => {
  const ChatInput = dc("input") as HTMLInputElement
  ChatInput.type = "text"
  setTimeout(() => {
    ChatInput.focus()
  }, 0)
  ChatInput.setAttribute("placeholder", "type your message")
  ChatInput.classList.add("chat-input")
  ChatInput.addEventListener("keyup", (event) => {
    sanitizeInput(ChatInput)

    if (event.key === "Enter") {
      const timestamp = new Date().toISOString()
      data.messages.push({
        content: ChatInput.value,
        sender: "User",
        timestamp,
      })

      ChatInput.value = ""
      renderList(false)
    }
  })

  const InputWrapper = dc("div")
  InputWrapper.appendChild(ChatInput)
  InputWrapper.classList.add("chat-input-wrapper")
  return InputWrapper
}