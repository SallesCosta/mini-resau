import "./List.style.scss"
import { UserInfo } from "@/components/UserInfo"
import { dc, formatTimestamp } from "@/helpers/helpers"
import { ConversationDetail } from "../ChatPage"
import { ChatMessages, EmptyState } from "./ChatMessages"

type ListProps = {
  conv: ConversationDetail[]
}

export const Wrapper = dc("div")
Wrapper.setAttribute("data-js", "chat-messages")
Wrapper.classList.add("chat")
Wrapper.appendChild(EmptyState)

export const List = ({ conv }: ListProps) => {
  const ListItem = (m: ConversationDetail) => {
    const Content = dc("p")
    Content.classList.add("content")
    Content.textContent = m.messages[0].content

    const Time = dc("span")
    Time.classList.add("time")
    const t = formatTimestamp(m.messages[m.messages.length - 1].timestamp)
    Time.textContent = t

    const listItem = dc("div")
    listItem.classList.add("wrapper")
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

  const list = dc("aside")
  list.setAttribute("data-js", "chat-list")
  list.classList.add("list")
  conv.forEach((m) => {
    list.appendChild(ListItem(m))
  })

  return list
}