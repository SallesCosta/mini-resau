import { UserInfo } from "@/components/UserInfo"
import {
  dc,
  formatTimestamp,
  sortConversationsByTimestamp,
} from "@/helpers/helpers"
import { ConversationDetail } from "../ChatPage"
import { ChatMessages, EmptyState } from "./ChatMessages"

type ListProps = {
  conv: ConversationDetail[]
}

export const Wrapper = dc("div")
Wrapper.setAttribute("data-js", "chat-messages")
Wrapper.classList.add("chat")
Wrapper.classList.add("scrollable")
Wrapper.appendChild(EmptyState)

export const List = ({ conv }: ListProps) => {
  const ListItem = (m: ConversationDetail) => {
    const Content = dc("p")

    const lastMessage = m.messages[m.messages.length - 1]
    Content.classList.add(lastMessage.sender === "User" ? "blue" : "red")
    Content.textContent = lastMessage.content

    const Time = dc("span")
    Time.classList.add("time")
    const t = formatTimestamp(lastMessage.timestamp)
    Time.textContent = t

    const listItem = dc("div")
    listItem.classList.add("wrapper")
    listItem.classList.add("scrollable")

    listItem.setAttribute("data-js", `chat-id-${m.id}`)
    listItem.appendChild(UserInfo(m.contact.name, m.contact.profilePicture))
    listItem.appendChild(Content)
    listItem.appendChild(Time)
    listItem.addEventListener("click", () => {
      const wrapperMessages = document.querySelector(
        '[data-js="chat-messages"]',
      ) as HTMLElement

      wrapperMessages.innerHTML = ""

      wrapperMessages.appendChild(ChatMessages(m))
    })
    return listItem
  }

  const renderItems = () => {
    list.innerHTML = ""

    const messagesNewOrder = sortConversationsByTimestamp(conv)
    messagesNewOrder.forEach((m) => {
      list.appendChild(ListItem(m))
    })
  }

  const list = dc("aside")
  list.setAttribute("data-js", "chat-list")
  list.classList.add("list")

  renderItems()

  return list
}