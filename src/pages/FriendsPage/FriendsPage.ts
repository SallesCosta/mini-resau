// Importation des dépendances nécessaires
import { renderPage } from "@/main"
import "./FriendsPage.style.scss"
import { dc, scrollToSelected } from "@/helpers/helpers"
import { createSkeleton } from "@/components/Skeleton"
import { showChat } from "../ChatPage/ChatPage"
import chat from "@/helpers/chat.json"
import { InputWrapper } from "./components/SearchInput"

// Fonction pour gérer le tri de la liste lors du drag & drop
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

// Composant pour créer un élément de la liste d'amis
const ListItem = (firstName: string, lastName: string): HTMLLIElement => {
  const listItem = dc("li") as HTMLLIElement
  listItem.classList.add("item")
  listItem.setAttribute("data-js", "friend-item")
  listItem.setAttribute("data-drag", "false")
  listItem.setAttribute("draggable", "true")

  const name = dc("b")
  const fullName = `${firstName} ${lastName}`
  name.textContent = fullName

  listItem.appendChild(name)

  // Gestion des événements de drag & drop
  listItem.addEventListener("dragstart", () => {
    listItem.classList.add("dragging")
    setTimeout(() => listItem.setAttribute("data-drag", "true"), 0)
  })

  listItem.addEventListener("dragend", () => {
    listItem.classList.remove("dragging")
    listItem.setAttribute("data-drag", "false")
  })

  // Recherche si l'ami a une conversation associée
  const userFound = chat.conversations.find(
    (conversation) => conversation.contact.name === fullName,
  )

  // Si une conversation existe, ajoute un événement de clic pour ouvrir le chat
  if (userFound) {
    listItem.addEventListener("click", () => {
      renderPage({
        page: "chat",
      })

      showChat(userFound)

      const list = document.querySelector(`[data-js="chat-list"]`)
      if (list) {
        const allListItems = list.querySelectorAll('[data-js^="chat-id-"]')
        allListItems.forEach((item) => {
          item.classList.remove("border-red")
        })

        const listItem = list.querySelector(
          `[data-js="chat-id-${userFound.id}"]`,
        )
        if (listItem) {
          listItem.classList.add("border-red")
          scrollToSelected(listItem)
        }
      }
    })
  }
  return listItem
}

// Création de la liste d'amis
const FriendsList = dc("ul")
FriendsList.setAttribute("data-js", "friend-list")
FriendsList.classList.add("sortable-list")

// Fonction pour afficher la liste des amis
export const renderNames = () => {
  FriendsList.innerHTML = ""
  //Pas besoin de JSON (amis codés en dur). (email)

  FriendsList.appendChild(ListItem("Alice", "Johnson"))
  FriendsList.appendChild(ListItem("Bob", "Smith"))
  FriendsList.appendChild(ListItem("Emma", "Dupont"))
  FriendsList.appendChild(ListItem("Pierre", "Lefebvre"))
  FriendsList.appendChild(ListItem("Harper", "Chen"))
  FriendsList.appendChild(ListItem("Jack", "Rodriguez"))
  FriendsList.appendChild(ListItem("David", "Williams"))
  FriendsList.appendChild(ListItem("Maria", "Jones"))
  FriendsList.appendChild(ListItem("Nina", "Davis"))
  FriendsList.appendChild(ListItem("Thomas", "Weber"))
  FriendsList.appendChild(ListItem("Sophie", "Anderson"))
  FriendsList.appendChild(ListItem("Isabella", "Moore"))
  FriendsList.appendChild(ListItem("Lucas", "Taylor"))
  FriendsList.appendChild(ListItem("Mia", "Anderson"))
  FriendsList.appendChild(ListItem("Alexander", "Thomas"))
}
renderNames()

// Gestion des événements de drag & drop sur la liste
FriendsList.addEventListener("dragenter", (e) => e.preventDefault())
FriendsList.addEventListener("dragover", (e) =>
  initSortableList(e as DragEvent),
)

// Fonction pour masquer la liste et afficher des skeletons
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

// Création et export du composant principal FriendsPage
export const FriendsPage = dc("div")
FriendsPage.setAttribute("data-js", "friends-page")
FriendsPage.classList.add("friends-page")
FriendsPage.appendChild(InputWrapper({ renderNames, hideList }))
FriendsPage.appendChild(FriendsList)