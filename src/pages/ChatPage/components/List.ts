import "./List.style.scss"
import { UserInfo } from "@/components/UserInfo"
import { dc, formatTimestamp } from "@/helpers/helpers"
import { ConversationDetail } from "../ChatPage"

type ListProps = {
  conv: ConversationDetail[]
  setC: (v: string) => void
}

export const List = ({ conv, setC }: ListProps) => {
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
    setC(m.id)
    return listItem
  }

  const list = dc("aside")
  list.setAttribute("data-js", "chat-list")
  list.classList.add("list")
  conv.forEach((m) => {
    list.appendChild(ListItem(m))
  })

  // if (selected) {
  //   console.log("selected :", selected)
  //   const a = dc("b")
  //   a.textContent = selected?.messages[0].content
  //   list.appendChild(a)
  // }

  return list
}