import "./List.style.scss"
import { UserInfo } from "../../../components/UserInfo"
import { dc } from "../../../helpers/helpers"
import { ConversationDetail } from "../ChatPage"

type ListProps = {
  conv: ConversationDetail[]
  setC: (v: string) => void
}

export const List = ({ conv, setC }: ListProps) => {
  // const name = conv[0].contact.name
  // const pic = conv[0].contact.profilePicture
  // const content = conv[0].messages[0].content
  // const time = conv[0].messages[0].timestamp
  // const sender = conv[0].messages[0].sender
  const Text = (t: string) => {
    const text = dc("span")
    text.textContent = t

    return text
  }

  const ListItem = (m: ConversationDetail) => {
    const Content = dc("p")
    Content.classList.add("content")
    Content.textContent = m.messages[0].content

    const Time = dc("span")
    Time.classList.add("time")
    Time.textContent = m.messages[m.messages.length - 1].timestamp

    const listItem = dc("div")
    listItem.classList.add("wrapper")
    listItem.appendChild(UserInfo(m.contact.name, m.contact.profilePicture))
    // listItem.appendChild(Text(m.messages[m.messages.length - 1].sender))
    listItem.appendChild(Content)
    listItem.appendChild(Time)

    return listItem
  }

  // console.log("chat :", chat.)
  const list = dc("container")
  list.setAttribute("data-js", "chat-list")
  list.classList.add("list")
  conv.forEach((m) => {
    list.appendChild(ListItem(m))
  })
  setC("9")

  // if (selected) {
  //   console.log("selected :", selected)
  //   const a = dc("b")
  //   a.textContent = selected?.messages[0].content
  //   list.appendChild(a)
  // }

  return list
}