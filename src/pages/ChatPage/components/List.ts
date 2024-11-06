import { dc, sortConversationsByTimestamp } from "@/helpers/helpers"
import { ConversationDetail } from "../ChatPage"
import { ListItem } from "./ListItem"

type ListProps = {
  conv: ConversationDetail[]
}
const ListIteUserPhoto = (photo: string) => {
  const userPhoto = dc("img") as HTMLImageElement
  userPhoto.classList.add("list-user-photo", "display-none")
  userPhoto.setAttribute("data-card", "list-user-image")
  userPhoto.src = photo
  return userPhoto
}

export const List = ({ conv }: ListProps) => {
  const renderItems = () => {
    list.innerHTML = ""
    const messagesNewOrder = sortConversationsByTimestamp(conv)
    messagesNewOrder.forEach((m) => {
      list.appendChild(ListItem(m))
      list.appendChild(ListIteUserPhoto(m.contact.profilePicture))
    })
  }

  const list = dc("aside")
  list.setAttribute("data-js", "chat-list")
  list.classList.add("list", "large-width")

  list.addEventListener("dblclick", () => {
    list.classList.toggle("large-width")
    list.classList.toggle("small-width")

    hideCards()
  })

  renderItems()

  return list
}

export const hideCards = () => {
  const listItems = document.querySelectorAll(
    '[data-card="card"]',
  ) as NodeListOf<HTMLElement>
  const items = Array.from(listItems)
  items.forEach((i) => {
    i.classList.toggle("display-none")
  })

  const userPhoto = document.querySelectorAll(
    '[data-card="list-user-image"]',
  ) as NodeListOf<HTMLElement>
  const photo = Array.from(userPhoto)

  photo.forEach((p) => {
    p.classList.toggle("display-none")
  })
}