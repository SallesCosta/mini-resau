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
    Content.setAttribute("data-card", "card")

    const Time = dc("span")
    Time.classList.add("time")
    Time.setAttribute("data-card", "card")
    const t = formatTimestamp(lastMessage.timestamp)
    Time.textContent = t

    const UserPhoto = dc("img") as HTMLImageElement
    UserPhoto.classList.add("user-photo", "display-none")
    UserPhoto.setAttribute("data-js", "image")
    UserPhoto.src = m.contact.profilePicture

    const userInfo = UserInfo(m.contact.name, m.contact.profilePicture)
    userInfo.setAttribute("data-card", "card")

    const listItem = dc("div")
    listItem.classList.add("wrapper", "scrollable")
    listItem.setAttribute("data-js", `chat-id-${m.id}`)
    listItem.appendChild(userInfo)
    listItem.appendChild(UserPhoto)
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
  const hideCardsAndShowPhoto = () => {
    const allCards = list.querySelectorAll(
      '[data-card="card"]',
    ) as NodeListOf<HTMLElement>
    const cards = Array.from(allCards)
    cards.forEach((p) => {
      p.classList.toggle("display-none")
    })

    const userPhoto = list.querySelectorAll(
      '[data-js="image"]',
    ) as NodeListOf<HTMLElement>
    const photo = Array.from(userPhoto)

    photo.forEach((p) => {
      p.classList.toggle("display-none")
    })
  }

  const list = dc("aside")
  list.setAttribute("data-js", "chat-list")
  list.classList.add("list", "large-width")

  list.addEventListener("dblclick", () => {
    list.classList.toggle("large-width")
    list.classList.toggle("small-width")
    hideCardsAndShowPhoto()
  })

  renderItems()

  return list
}