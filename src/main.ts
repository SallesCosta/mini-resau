import "./main-style.scss"

import { HeaderElement } from "./components/Header"
import { FeedPage } from "./pages/FeedPage"
import { FriendsPage } from "./pages/FriendsPage"
import { ChatPage } from "./pages/ChatPage"

const contentContainer = document.createElement("div")
contentContainer.setAttribute("data-js", "contentContainer")

const renderPage = (page: "feed" | "chat" | "friends") => {
  contentContainer.innerHTML = ""

  const component =
    {
      feed: FeedPage,
      friends: FriendsPage,
      chat: ChatPage,
    }[page] || FeedPage

  contentContainer.appendChild(component)
}

renderPage("feed")

const headerButtons = HeaderElement.querySelectorAll('[data-js="nav-btn"]')
headerButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const target = event.currentTarget as HTMLElement
    const page = target.dataset.page as "feed" | "chat" | "friends"
    renderPage(page)
  })
})

const App = document.querySelector<HTMLDivElement>('[data-js="app"]')
App?.appendChild(HeaderElement)
App?.appendChild(contentContainer)