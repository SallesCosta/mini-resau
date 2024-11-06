import { dc, formatTimestamp, sanitizeInput } from "@/helpers/helpers"
import { ConversationDetail, EmptyState, showChat } from "../ChatPage"
import { UserInfo } from "@/components/UserInfo"
import { ListItemContent, ListItemTime } from "./ListItem"
import me from "@/helpers/me.json"

type msgProps = {
  timestamp: string
  sender: string
  content: string
  image: string
}

const msg = ({ timestamp, sender, content, image }: msgProps) => {
  const msgWrapper = dc("div")

  msgWrapper.classList.add("baseMsg")
  msgWrapper.classList.add(sender === "User" ? "myMsg" : "friendMessage")

  const photo = sender === "User" ? me.photo : image

  const userInfo = UserInfo(sender, photo)

  const contentElement = dc("p")
  contentElement.textContent = content

  const timeElement = dc("span")
  timeElement.textContent = formatTimestamp(timestamp)

  msgWrapper.appendChild(userInfo)
  msgWrapper.appendChild(contentElement)
  msgWrapper.appendChild(timeElement)

  return msgWrapper
}
export const ChatMessages = (selected: ConversationDetail | null) => {
  const chatMessages = dc("container")
  chatMessages.classList.add("chatMessages")

  if (!selected) return EmptyState

  const data = {
    name: selected.contact.name,
    image: selected.contact.profilePicture,
    messages: selected.messages,
  }

  const header = dc("header")
  header.classList.add("header")
  header.appendChild(UserInfo(data.name, data.image))

  const body = dc("div")
  body.classList.add("msgContainer")

  chatMessages.appendChild(header)
  chatMessages.appendChild(body)

  const renderList = (firstRender: boolean) => {
    const listItem = document.querySelector(
      `[data-js="chat-id-${selected.id}"]`,
    )

    const lastMessage = selected.messages[selected.messages.length - 1]

    if (listItem && !firstRender) {
      listItem.innerHTML = ""
      listItem.appendChild(
        UserInfo(selected.contact.name, selected.contact.profilePicture),
      )
      listItem.appendChild(ListItemContent(lastMessage))
      listItem.appendChild(ListItemTime(lastMessage))
      listItem.addEventListener("click", () => showChat(selected))
    }

    const scrollToBottom = () => {
      body.scrollTop = body.scrollHeight
    }

    body.innerHTML = ""
    data.messages.forEach((i) => {
      const f = {
        sender: i.sender,
        content: i.content,
        timestamp: i.timestamp,
        image: data.image,
      }
      body.appendChild(msg(f))
      scrollToBottom()
    })
  }
  renderList(true)

  const ChatInput = dc("input") as HTMLInputElement
  ChatInput.type = "text"
  setTimeout(() => {
    ChatInput.focus()
  }, 0)
  ChatInput.setAttribute("placeholder", "type your message")
  ChatInput.classList.add("chat-input")
  ChatInput.addEventListener("keyup", (event) => {
    sanitizeInput(ChatInput)

    if (event.key === "Enter") {
      const timestamp = new Date().toISOString()
      data.messages.push({
        content: ChatInput.value,
        sender: "User",
        timestamp,
      })

      ChatInput.value = ""
      renderList(false)
    }
  })

  const InputWrapper = dc("div")
  InputWrapper.appendChild(ChatInput)
  InputWrapper.classList.add("chat-input-wrapper")
  chatMessages.appendChild(InputWrapper)

  return chatMessages
}