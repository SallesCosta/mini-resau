import "./main.style.scss"
import { HeaderElement } from "./components/Header"
import { FeedPage } from "./pages/FeedPage/FeedPage"
import { FriendsPage } from "./pages/FriendsPage/FriendsPage"
import { ChatPage } from "./pages/ChatPage/ChatPage"

const contentContainer = document.createElement("div")
contentContainer.setAttribute("data-js", "contentContainer")

export type ChatPageContentProps = {
  firstName: string
  lastName: string
}

type RenderPageProps = {
  page: "feed" | "chat" | "friends"
}

export const renderPage = ({ page }: RenderPageProps) => {
  contentContainer.innerHTML = ""

  const component =
    {
      feed: FeedPage,
      friends: FriendsPage,
      chat: ChatPage,
    }[page] || FeedPage

  contentContainer.appendChild(component)
}

renderPage({ page: "chat" })

const headerButtons = HeaderElement.querySelectorAll('[data-js="nav-btn"]')
headerButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const target = event.currentTarget as HTMLElement
    const page = target.dataset.page as "feed" | "chat" | "friends"
    renderPage({ page })
  })
})

const App = document.querySelector<HTMLDivElement>('[data-js="app"]')
App?.classList.add("main")
App?.appendChild(HeaderElement)
App?.appendChild(contentContainer)