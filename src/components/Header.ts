import "./Header.style.scss"
import { dc } from "@/helpers/helpers.ts"
import { ChatIcon, FriendsIcon, HomeIcon } from "./SvgIcons.ts"
import { UserInfo } from "@/components/UserInfo"
import me from "@/helpers/me.json"

const Wrapper = (element: HTMLElement, label: string) => {
  const labelText = dc("span")
  labelText.textContent = label
  const wrapper = dc("div")
  wrapper.classList.add("header-content__wrapper")
  wrapper.appendChild(element)
  wrapper.appendChild(labelText)

  return wrapper
}

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

const navigation = dc("nav")
navigation?.classList.add("header-content__nav-wrapper")
navigation?.appendChild(Wrapper(linkToFeedPage, "feed"))
navigation?.appendChild(Wrapper(linkToFriendsPage, "friends"))
navigation?.appendChild(Wrapper(linkToChatPage, "chat"))

const mobileTitle = dc("h1")
mobileTitle.textContent = "Mini-Résau"
mobileTitle.classList.add("header-content__title")

const el = dc("div")
el?.classList.add("header-content__el")
el?.appendChild(mobileTitle)
el?.appendChild(navigation)

const userInfo = UserInfo(me.last_name, me.photo, me.last_name)
userInfo?.classList.add("header-content__user-info")

export const HeaderElement = dc("header")
HeaderElement.setAttribute("data-js", "headerElement")
HeaderElement.classList.add("header-content")
HeaderElement?.appendChild(el)
HeaderElement?.appendChild(userInfo)