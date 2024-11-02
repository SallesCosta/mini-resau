import "./Header.style.scss"
import { dc } from "../helpers/helpers.ts"
import { ChatIcon, FriendsIcon, HomeIcon } from "./SvgIcons.ts"

const linkToChatPage = dc("a")
linkToChatPage.innerHTML = `
${ChatIcon()}
`
linkToChatPage.setAttribute("data-js", "nav-btn")
linkToChatPage.setAttribute("data-page", "chat")
linkToChatPage.classList.add("header-content__link-page")

const linkToFriendsPage = dc("a")
linkToFriendsPage.innerHTML = `${FriendsIcon()}`
linkToFriendsPage.setAttribute("data-js", "nav-btn")
linkToFriendsPage.setAttribute("data-page", "friends")
linkToFriendsPage.classList.add("header-content__link-page")

const linkToFeedPage = dc("a")
linkToFeedPage.innerHTML = `${HomeIcon()}`
linkToFeedPage.setAttribute("data-js", "nav-btn")
linkToFeedPage.setAttribute("data-page", "feed")
linkToFeedPage.classList.add("header-content__link-page")

const navigation = dc("div")
navigation?.classList.add("header-content__nav-wrapper")
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