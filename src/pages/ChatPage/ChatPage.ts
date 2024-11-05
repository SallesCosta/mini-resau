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

// type ConversationSummary = {
//   contact: Contact
// }

export type ConversationDetail = {
  contact: Contact
  messages: Message[]
}

// export type ChatData = {
//   conversations: ConversationSummary[]
// }

export const ChatPage = (id: string) => {
  let c: string
  const selected = chat.conversations.find((c) => c.id === id)

  const setC = (v: string) => {
    c = v
  }

  // const ChatMessages = () => {
  //   const chatMessages = dc("container")
  //   chatMessages.setAttribute("data-js", "chat-messages")
  //   chatMessages.classList.add("chat")
  //
  //   if (selected) {
  //     const b = dc("b")
  //     b.textContent = selected.contact.name
  //     chatMessages.appendChild(b)
  //   }
  //   console.log("c: ", c)
  //
  //   return chat
  // }

  const conv = chat.conversations

  const container = dc("container")
  container.classList.add("container")
  container.appendChild(List({ conv, setC }))
  // container.appendChild(ChatMessages())

  const chatPage = dc("div")
  chatPage.setAttribute("data-js", "chat-page")
  chatPage.appendChild(container)

  return chatPage
}