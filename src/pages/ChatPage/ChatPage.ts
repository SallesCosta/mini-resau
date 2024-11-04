import { dc } from "../../helpers/helpers"
import { ChatPageContentProps } from "../../main"

export const ChatPage = ({ firstName, lastName }: ChatPageContentProps) => {
  const a = dc("b")
  a.textContent = firstName

  const b = dc("b")
  b.textContent = lastName

  const chatPage = dc("div")
  chatPage.setAttribute("data-js", "chat-page")
  chatPage.appendChild(a)
  chatPage.appendChild(b)

  return chatPage
}