// Importation des styles et des composants nécessaires
import "./main.style.scss"
import { HeaderElement } from "./components/Header"
import { FeedPage } from "./pages/FeedPage/FeedPage"
import { FriendsPage } from "./pages/FriendsPage/FriendsPage"
import { ChatPage } from "./pages/ChatPage/ChatPage"

// Création du conteneur principal pour le contenu dynamique
const contentContainer = document.createElement("div")
contentContainer.setAttribute("data-js", "contentContainer")

// Type pour les props de la page de chat
export type ChatPageContentProps = {
  firstName: string
  lastName: string
}

// Type pour définir quelle page doit être rendue
type RenderPageProps = {
  page: "feed" | "chat" | "friends"
}

// Fonction pour rendre la page sélectionnée
export const renderPage = ({ page }: RenderPageProps) => {
  contentContainer.innerHTML = ""

  // Sélection du composant à afficher en fonction de la page demandée
  const component =
    {
      feed: FeedPage,
      friends: FriendsPage,
      chat: ChatPage,
    }[page] || FeedPage

  contentContainer.appendChild(component)
}

// Affichage initial de la page feed
renderPage({ page: "feed" })

// Gestion des événements de navigation
const headerButtons = HeaderElement.querySelectorAll('[data-js="nav-btn"]')
headerButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const target = event.currentTarget as HTMLElement
    const page = target.dataset.page as "feed" | "chat" | "friends"
    renderPage({ page })
  })
})

// Configuration et montage de l'application
const App = document.querySelector<HTMLDivElement>('[data-js="app"]')
App?.classList.add("main")
App?.appendChild(HeaderElement)
App?.appendChild(contentContainer)