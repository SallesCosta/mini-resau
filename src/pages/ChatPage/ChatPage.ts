import "./ChatPage.style.scss"
import { dc } from "@/helpers/helpers"
import chat from "@/helpers/chat.json"
import { List, Wrapper } from "./components/List"

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

export const ChatPage = () => {
  const container = dc("container")
  container.setAttribute("data-js", "main-container")
  container.classList.add("container")
  container.appendChild(List({ conv: chat.conversations }))
  container.appendChild(Wrapper)

  const chatPage = dc("div")
  chatPage.setAttribute("data-js", "chat-page")
  chatPage.appendChild(container)

  return chatPage
}