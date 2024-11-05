import { dc, formatTimestamp, sanitizeInput } from "@/helpers/helpers"
import { ConversationDetail } from "../ChatPage"
import { UserInfo } from "@/components/UserInfo"

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
    <span>${formatTimestamp(timestamp)}</span>
  `

  return msgWrapper
}

export const ChatMessages = (selected: ConversationDetail | null) => {
  const chatMessages = dc("container")

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
    console.log("foi :")
    const listItem = document.querySelector(
      `[data-js="chat-id-${selected.id}"]`,
    )

    const Content = dc("p")

    const lastMessage = selected.messages[selected.messages.length - 1]

    Content.classList.add(lastMessage.sender === "User" ? "blue" : "red")
    Content.textContent = lastMessage.content

    const Time = dc("span")
    Time.classList.add("time")
    const t = formatTimestamp(lastMessage.timestamp)
    Time.textContent = t

    if (listItem && !firstRender) {
      const allCards = document.querySelectorAll('[data-card="card"]')
      allCards.forEach((c) => {
        if (c.classList.contains("display-none")) {
          return
        } else {
          listItem.innerHTML = ""
          listItem.appendChild(
            UserInfo(selected.contact.name, selected.contact.profilePicture),
          )
          listItem.appendChild(Content)
          listItem.appendChild(Time)
        }
      })
    }

    const scrollToBottom = () => {
      body.scrollTop = body.scrollHeight
    }

    body.innerHTML = ""

    data.messages.forEach((i) => {
      body.appendChild(msg(i))
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

const txt = dc("b")
txt.textContent = "<<= select a friend"

export const EmptyState = dc("div")
EmptyState.appendChild(txt)