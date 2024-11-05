import "./ChatMessages.style.scss"
import { dc, formatTimestamp } from "@/helpers/helpers"
import { ConversationDetail } from "../ChatPage"
import { UserInfo } from "@/components/UserInfo"
// import me from "@/helpers/me.json"

type msgProps = {
  timestamp: string
  sender: string
  content: string
}

const msg = ({ timestamp, sender, content }: msgProps) => {
  const msgWrapper = dc("div")

  msgWrapper.classList.add("baseMsg")
  msgWrapper.classList.add(sender === "User" ? "myMsg" : "friendMessage")

  msgWrapper.innerHTML = `
    <p>${content}</p>
    <!-- <span>${sender}</span> -->
    <span>${formatTimestamp(timestamp)}</span>
  `

  return msgWrapper
}

export const ChatMessages = (selected: ConversationDetail | null) => {
  const chatMessages = dc("container")

  chatMessages.classList.add("msgContainer")

  if (!selected) return EmptyState

  const data = {
    name: selected.contact.name,
    image: selected.contact.profilePicture,
    messages: selected.messages,
  }

  console.log("messages :", data.messages)

  const header = dc("header")
  header.classList.add("header")
  header.appendChild(UserInfo(data.name, data.image))

  chatMessages.appendChild(header)
  data.messages.reverse().forEach((i) => {
    chatMessages.appendChild(msg(i))
  })

  return chatMessages
}

const txt = dc("b")
txt.textContent = "<<= select a friend"

export const EmptyState = dc("div")
EmptyState.appendChild(txt)