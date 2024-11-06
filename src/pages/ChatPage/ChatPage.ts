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

const container = dc("container")
container.classList.add("container")
container.appendChild(List({ conv: chat.conversations }))
container.appendChild(Wrapper)

export const ChatPage = dc("div")
ChatPage.setAttribute("data-js", "chat-page")
ChatPage.appendChild(container)