import "./ChatPage.style.scss"
import { dc } from "@/helpers/helpers"
import chat from "@/helpers/chat.json"
import { List } from "./components/List"

export type Message = {
  timestamp: string
  sender: string
  content: string
}

type Contact = {
  name: string
  profilePicture: string
}
export type ConversationDetail = {
  contact: Contact
  messages: Message[]
  id: string
}

// type ConversationSummary = {
//   contact: Contact
// }

// export type ChatData = {
//   conversations: ConversationSummary[]
// }

export const ChatPage = (id: string) => {
  let c: string
  const selected = chat.conversations.find((c) => c.id === id)

  const setC = (v: string) => {
    c = v
  }
  const conv = chat.conversations

  const container = dc("container")
  container.classList.add("container")
  container.appendChild(List({ conv, setC }))
  container.appendChild(ChatMessages(selected))

  const chatPage = dc("div")
  chatPage.setAttribute("data-js", "chat-page")
  chatPage.appendChild(container)

  return chatPage
}