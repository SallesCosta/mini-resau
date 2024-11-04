import { dc } from "../../helpers/helpers"
import chat from "../../helpers/chat.json"

export type Message = {
  timestamp: string
  sender: string
  content: string
}

export type Contact = {
  name: string
  profilePicture: string
}

export type ConversationSummary = {
  contact: Contact
  lastMessage: Message
}

export type ConversationDetail = {
  contact: Contact
  messages: Message[]
}

export type ChatData = {
  conversations: ConversationSummary[]
}

export const ChatPage = (id: string) => {
  const selected = chat.conversations.find((c) => c.id === id)

  const List = () => {
    const list = dc("container")
    list.setAttribute("data-js", "chat-list")
    list.classList.add("list")

    if (selected) {
      console.log("selected :", selected)
      const a = dc("b")
      a.textContent = selected?.messages[0].content
      list.appendChild(a)
    }

    return list
  }

  const Chat = () => {
    const chat = dc("container")
    chat.setAttribute("data-js", "chat-messages")
    chat.classList.add("chat")

    if (selected) {
      const b = dc("b")
      b.textContent = selected.contact.name
      chat.appendChild(b)
    }

    return chat
  }

  const container = dc("container")
  container.classList.add("container")
  container.appendChild(List())
  container.appendChild(Chat())

  const chatPage = dc("div")
  chatPage.setAttribute("data-js", "chat-page")
  chatPage.appendChild(container)

  return chatPage
}