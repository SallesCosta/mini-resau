import "./Header.style.scss"
import { dc } from "../helpers/helpers.ts"

const linkToChatPage = dc("a")
linkToChatPage.textContent = "chat"

const linkToFriendsPage = dc("a")
linkToFriendsPage.textContent = "friends"

const linkToFeedPage = dc("a")
linkToFeedPage.textContent = "feed"

const navigation = dc("div")
navigation.classList.add("header-content__nav-wrapper")
navigation?.appendChild(linkToFeedPage)
navigation?.appendChild(linkToChatPage)
navigation?.appendChild(linkToFriendsPage)

const mobileTitle = dc("h1")
mobileTitle.textContent = "Mini-Résau"
mobileTitle.classList.add("header-content__title")

export const HeaderElement = dc("header")
HeaderElement.setAttribute("data-js", "headerElement")
HeaderElement.classList.add("header-content")
HeaderElement?.appendChild(mobileTitle)
HeaderElement?.appendChild(navigation)