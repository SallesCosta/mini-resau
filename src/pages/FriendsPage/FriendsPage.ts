import "./FriendsPage.style.scss"
import { dc, sanitizeInput } from "../../helpers/helpers"
import { renderPage } from "../../main"

const initSortableList = (e: DragEvent) => {
  e.preventDefault()

  const draggingItem = document.querySelector(
    '[data-drag="true"]',
  ) as HTMLLIElement

  const sortableList = document.querySelector(
    '[data-js="friend-list"]',
  ) as HTMLUListElement

  if (!draggingItem || !sortableList) return

  const siblings = Array.from(
    sortableList.querySelectorAll('[data-js="friend-item"]'),
  ).filter((sibling) => sibling !== draggingItem) as HTMLLIElement[]

  const nextSibling =
    siblings.find((sibling) => {
      const rect = sibling.getBoundingClientRect()
      return e.clientY < rect.top + rect.height / 2
    }) || null

  sortableList.insertBefore(draggingItem, nextSibling)
}
const ListItem = (firstName: string, lastName: string): HTMLLIElement => {
  const listItem = dc("li") as HTMLLIElement
  listItem.classList.add("item")
  listItem.setAttribute("data-js", "friend-item")
  listItem.setAttribute("data-drag", "false")
  listItem.setAttribute("draggable", "true")

  const name = dc("b")
  name.textContent = `${firstName} ${lastName}`

  listItem.appendChild(name)

  listItem.addEventListener("dragstart", () => {
    listItem.classList.add("dragging")
    setTimeout(() => listItem.setAttribute("data-drag", "true"), 0)
  })

  listItem.addEventListener("dragend", () => {
    listItem.classList.remove("dragging")
    listItem.setAttribute("data-drag", "false")
  })

  listItem.addEventListener("click", () =>
    renderPage({
      page: "chat",
      content: {
        firstName,
        lastName,
      },
    }),
  )
  return listItem
}

const FriendsList = dc("ul")
FriendsList.setAttribute("data-js", "friend-list")
FriendsList.classList.add("sortable-list")
const renderNames = () => {
  FriendsList.innerHTML = ""
  //Pas besoin de JSON (amis codés en dur).
  FriendsList.appendChild(ListItem("Emily", "Johnson"))
  FriendsList.appendChild(ListItem("Michael", "Smith"))
  FriendsList.appendChild(ListItem("Olivia", "Brown"))
  FriendsList.appendChild(ListItem("Sebastian", "Garcia"))
  FriendsList.appendChild(ListItem("Harper", "Martinez"))
  FriendsList.appendChild(ListItem("Jack", "Robinson"))
  FriendsList.appendChild(ListItem("James", "Williams"))
  FriendsList.appendChild(ListItem("Sophia", "Jones"))
  FriendsList.appendChild(ListItem("Benjamin", "Davis"))
  FriendsList.appendChild(ListItem("Ava", "Miller"))
  FriendsList.appendChild(ListItem("Elijah", "Wilson"))
  FriendsList.appendChild(ListItem("Isabella", "Moore"))
  FriendsList.appendChild(ListItem("Lucas", "Taylor"))
  FriendsList.appendChild(ListItem("Mia", "Anderson"))
  FriendsList.appendChild(ListItem("Alexander", "Thomas"))
  FriendsList.appendChild(ListItem("Charlotte", "Jackson"))
  FriendsList.appendChild(ListItem("Daniel", "White"))
  FriendsList.appendChild(ListItem("Amelia", "Harris"))
  FriendsList.appendChild(ListItem("Henry", "Martin"))
  FriendsList.appendChild(ListItem("Evelyn", "Thompson"))
}
renderNames()

FriendsList.addEventListener("dragenter", (e) => e.preventDefault())
FriendsList.addEventListener("dragover", (e) =>
  initSortableList(e as DragEvent),
)

const hideList = () => {
  const allFriends = document.querySelectorAll<HTMLLIElement>(
    '[data-js="friend-item"]',
  )
  const ArrayAllFriends = Array.from(allFriends)
  ArrayAllFriends.forEach((f) => f.classList.add("display-none"))
}

const SearchInput = dc("input") as HTMLInputElement
SearchInput.type = "text"
setTimeout(() => {
  SearchInput.focus()
}, 0)
SearchInput.setAttribute("placeholder", "search for first name or last name")
SearchInput.classList.add("search-input")
SearchInput.addEventListener("keyup", (event) => {
  SearchInput.value === "" ? renderNames() : hideList()
  sanitizeInput(SearchInput)
  const searchTerm = SearchInput.value.toLowerCase()

  if (event.key === "Enter") {
    const allFriends = document.querySelectorAll<HTMLLIElement>(
      '[data-js="friend-item"]',
    )
    const friendsArray = Array.from(allFriends)

    friendsArray.forEach((friend) => {
      const [firstName, lastName] = friend.innerText.toLowerCase().split(" ")
      const isMatch =
        firstName.includes(searchTerm) || lastName.includes(searchTerm)

      if (searchTerm === "") {
        friend.classList.remove("display-none")
      } else {
        friend.classList.toggle("display-none", !isMatch)
      }
    })
  }
})
const InputWrapper = dc("div")
InputWrapper.appendChild(SearchInput)
InputWrapper.classList.add("search-input-wrapper")

export const FriendsPage = dc("div")
FriendsPage.setAttribute("data-js", "friends-page")
FriendsPage.classList.add("friends-page")
FriendsPage.appendChild(InputWrapper)
FriendsPage.appendChild(FriendsList)