// Importation des dépendances nécessaires pour la page de chat
import "./ChatPage.style.scss"
import { dc } from "@/helpers/helpers"
import chat from "@/helpers/chat.json"
import { List } from "./components/List"
import { ChatMessages } from "./components/ChatMessages"

// Définition des types pour les messages
export type Message = {
  timestamp: string // Horodatage du message
  sender: string // Expéditeur du message  
  content: string // Contenu du message
}

// Type pour les informations de contact
type Contact = {
  name: string // Nom du contact
  profilePicture: string // Photo de profil
}

// Type pour les détails d'une conversation
export type ConversationDetail = {
  contact: Contact // Informations du contact
  messages: Message[] // Liste des messages
  id: string // Identifiant unique de la conversation
}

// Fonction pour afficher une conversation spécifique
export const showChat = (message: ConversationDetail) => {
  const wrapperMessages = document.querySelector(
    '[data-js="chat-messages"]',
  ) as HTMLElement
  wrapperMessages.innerHTML = ""
  wrapperMessages.appendChild(ChatMessages(message))
}

// Création de l'état vide (quand aucune conversation n'est sélectionnée)
export const EmptyState = dc("div")
const txt = dc("b")
txt.textContent = "select a friend"
EmptyState.appendChild(txt)

// Création du conteneur principal des messages
export const Wrapper = dc("div")
Wrapper.setAttribute("data-js", "chat-messages")
Wrapper.classList.add("chat-messages")
Wrapper.appendChild(EmptyState)

// Création et configuration de la page principale de chat
export const ChatPage = dc("div")
ChatPage.setAttribute("data-js", "chat-page")
ChatPage.classList.add("chat-page")
ChatPage.appendChild(List({ conv: chat.conversations })) // Ajout de la liste des conversations
ChatPage.appendChild(Wrapper) // Ajout du conteneur de messages