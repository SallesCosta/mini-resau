import "./List.style.scss"
import {
  dc,
  scrollToSelected,
  sortConversationsByTimestamp,
} from "@/helpers/helpers"
import { ConversationDetail, showChat } from "../ChatPage"
import { ListItem } from "./ListItem"

type ListProps = {
  conv: ConversationDetail[]
}
const ListIteUserPhoto = (m: ConversationDetail) => {
  const userPhoto = dc("img") as HTMLImageElement
  userPhoto.classList.add("list-user-photo", "display-none")

  userPhoto.setAttribute("data-card", "list-user-image")
  userPhoto.setAttribute("data-js", `list-user-image-${m.id}`)

  userPhoto.src = m.contact.profilePicture
  userPhoto.addEventListener("click", () => {
    showChat(m)
    const allListItems = document.querySelectorAll(
      '[data-card="list-user-image"]',
    )

    allListItems.forEach((item) => {
      item.classList.remove("bg-red")
    })

    userPhoto.classList.add("bg-red")

    scrollToSelected(userPhoto)
  })
  return userPhoto
}

export const List = ({ conv }: ListProps) => {
  const renderItems = () => {
    list.innerHTML = ""
    const messagesNewOrder = sortConversationsByTimestamp(conv)
    messagesNewOrder.forEach((m) => {
      list.appendChild(ListItem(m))
      list.appendChild(ListIteUserPhoto(m))
    })
  }

  const list = dc("aside")
  list.setAttribute("data-js", "chat-list")
  list.classList.add("chat-list", "large-width")

  renderItems()

  return list
}