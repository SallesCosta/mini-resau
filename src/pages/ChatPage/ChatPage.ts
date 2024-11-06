import "./ChatPage.style.scss"
import { dc } from "@/helpers/helpers"
import chat from "@/helpers/chat.json"
import { List } from "./components/List"
import { ChatMessages } from "./components/ChatMessages"

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

export const showChat = (message: ConversationDetail) => {
  const wrapperMessages = document.querySelector(
    '[data-js="chat-messages"]',
  ) as HTMLElement
  wrapperMessages.innerHTML = ""
  wrapperMessages.appendChild(ChatMessages(message))
}

export const EmptyState = dc("div")
const txt = dc("b")
txt.textContent = "<<= select a friend"
EmptyState.appendChild(txt)

export const Wrapper = dc("div")
Wrapper.setAttribute("data-js", "chat-messages")
Wrapper.classList.add("chat")
Wrapper.classList.add("scrollable")
Wrapper.appendChild(EmptyState)

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