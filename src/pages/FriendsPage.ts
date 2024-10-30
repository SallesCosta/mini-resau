import { dc } from "../helpers/helpers"

export const FriendsPage = dc("div")
FriendsPage.textContent = "friends"
FriendsPage.setAttribute("data-js", "friends-page")

export const ChatPage = dc("div")
ChatPage.textContent = "Chat"
ChatPage.setAttribute("data-js", "chat-page")

export const FeedPage = dc("div")
FeedPage.textContent = "feed"
FeedPage.setAttribute("data-js", "feed-page")