import { UserInfo } from "@/components/UserInfo"
import { dc, formatTimestamp } from "@/helpers/helpers"
import { ConversationDetail, showChat } from "../ChatPage"

export const ListItemContent = (lastMessage: {
  sender: string
  content: string
}) => {
  const content = dc("p")
  content.classList.add("listBaseMsg")
  content.classList.add(
    lastMessage.sender === "User" ? "myMsg" : "friendMessage",
  )
  content.textContent = lastMessage.content
  return content
}

export const ListItemTime = (lastMessage: { timestamp: string }) => {
  const time = dc("span")
  time.classList.add("time")
  time.textContent = formatTimestamp(lastMessage.timestamp)

  return time
}

export const ListItem = (m: ConversationDetail) => {
  const lastMessage = m.messages[m.messages.length - 1]

  const userInfo = UserInfo(m.contact.name, m.contact.profilePicture)

  const listItem = dc("div")
  listItem.classList.add("list-item")
  listItem.setAttribute("data-js", `chat-id-${m.id}`)
  listItem.setAttribute("data-card", `card`)
  listItem.appendChild(userInfo)
  listItem.appendChild(ListItemContent(lastMessage))
  listItem.appendChild(ListItemTime(lastMessage))
  listItem.addEventListener("click", () => {
    showChat(m)
    const allListItems = document.querySelectorAll('[data-js^="chat-id-"]')
    allListItems.forEach((item) => {
      item.classList.remove("border-red")
    })
    listItem.classList.add("border-red")
  })

  return listItem
}