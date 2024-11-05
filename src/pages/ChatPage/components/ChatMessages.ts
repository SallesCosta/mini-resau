import { dc } from "@/helpers/helpers"

export const ChatMessages = () => {
  const chatMessages = dc("container")
  chatMessages.setAttribute("data-js", "chat-messages")
  chatMessages.classList.add("chat")

  if (selected) {
    const b = dc("b")
    b.textContent = selected.contact.name
    chatMessages.appendChild(b)
  }
  console.log("c: ", c)

  return chatMessages
}