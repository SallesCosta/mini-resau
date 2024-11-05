import { renderPage } from "@/main"
import "./FriendsPage.style.scss"
import { dc, sanitizeInput } from "@/helpers/helpers"
import { createSkeleton } from "@/components/Skeleton"

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
const ListItem = (
  firstName: string,
  lastName: string,
  userId: string,
): HTMLLIElement => {
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
      userId: userId,
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

  FriendsList.appendChild(ListItem("Emily", "Johnson", "1"))
  FriendsList.appendChild(ListItem("Michael", "Smith", "2"))
  FriendsList.appendChild(ListItem("Olivia", "Brown", "3"))
  FriendsList.appendChild(ListItem("Sebastian", "Garcia", "4"))
  FriendsList.appendChild(ListItem("Harper", "Martinez", "5"))
  FriendsList.appendChild(ListItem("Jack", "Robinson", "6"))
  FriendsList.appendChild(ListItem("James", "Williams", "7"))
  FriendsList.appendChild(ListItem("Sophia", "Jones", "8"))
  FriendsList.appendChild(ListItem("Benjamin", "Davis", "9"))
  FriendsList.appendChild(ListItem("Ava", "Miller", "10"))
  FriendsList.appendChild(ListItem("Elijah", "Wilson", "11"))
  FriendsList.appendChild(ListItem("Isabella", "Moore", "12"))
  FriendsList.appendChild(ListItem("Lucas", "Taylor", "13"))
  FriendsList.appendChild(ListItem("Mia", "Anderson", "14"))
  FriendsList.appendChild(ListItem("Alexander", "Thomas", "15"))
  FriendsList.appendChild(ListItem("Charlotte", "Jackson", "16"))
  FriendsList.appendChild(ListItem("Daniel", "White", "17"))
  FriendsList.appendChild(ListItem("Amelia", "Harris", "18"))
  FriendsList.appendChild(ListItem("Henry", "Martin", "19"))
  FriendsList.appendChild(ListItem("Evelyn", "Thompson", "20"))
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
  const arrayAllFriends = Array.from(allFriends)

  let isAlreadyHidden = true

  arrayAllFriends.forEach((friend) => {
    if (!friend.classList.contains("display-none")) {
      friend.classList.add("display-none")
      isAlreadyHidden = false
    }
  })

  if (!isAlreadyHidden) {
    for (let i = 0; i < 3; i++) {
      const skeleton = createSkeleton("100%", "42px")
      skeleton.setAttribute("data-js", "skeletonElement")
      FriendsList.appendChild(skeleton)
    }
  }
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
        const skeletons = document.querySelectorAll(
          '[data-js="skeletonElement"]',
        )
        if (searchTerm !== "") {
          skeletons.forEach((skeleton) => skeleton.remove())
        }
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