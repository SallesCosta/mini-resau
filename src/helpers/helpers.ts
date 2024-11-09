// Importation des données de l'utilisateur connecté
import me from "./me.json"

// Fonction pour générer un identifiant unique basé sur la date et un nombre aléatoire
export const uuid = () => {
  const head = Date.now().toString(36)
  const tail = Math.random().toString(36).substr(2)

  return head + tail
}

// Fonction utilitaire pour créer des éléments DOM
export const dc = (element: string) => {
  return document.createElement(element)
}

// Fonction pour faire défiler la page vers un élément spécifique
export const navigateTo = (element: Element | null) => {
  if (!element) return
  element.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center",
  })
}

// Récupération des informations de l'utilisateur connecté
const firstName = me.first_name
const lastName = me.last_name
const mePhoto = me.photo

// Type pour les données utilisateur
export type userDataProps = {
  firstName: string
  lastName: string
  mePhoto: string
  userId: string
}

// Objet contenant les données de l'utilisateur connecté
export const userData: userDataProps = {
  firstName,
  lastName,
  mePhoto,
  userId: uuid(),
}

// Fonction pour formater le nom de l'utilisateur (prénom + première lettre du nom)
function brefName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName.charAt(0).toUpperCase()}.`
}

export const commentUserName = brefName(firstName, lastName)

// Fonction pour nettoyer les entrées utilisateur (supprime les caractères non autorisés)
export const sanitizeInput = (input: HTMLInputElement) => {
  const allowedChars = /^[a-zA-Z0-9\s.,!?'áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]*$/
  if (!allowedChars.test(input.value)) {
    input.value = input.value.replace(
      /[^a-zA-Z0-9\s.,!?'áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/g,
      "",
    )
    alert("Invalid characters have been removed.")
  }
}

// Fonction pour formater les horodatages en format lisible
export function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp)

  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()

  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")

  return `${day}/${month}/${year} ${hours}:${minutes}`
}

// Types pour la gestion des messages et conversations
type msgProps = {
  timestamp: string
  sender: string
  content: string
}

type Contact = {
  name: string
  profilePicture: string
}

export type ConversationDetail = {
  contact: Contact
  messages: msgProps[]
  id: string
}

// Fonctions pour trier les messages par date
export const reordChatMessages = (messages: msgProps[]) => {
  return messages.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  )
}

export function sortConversationsByTimestamp(
  conversations: ConversationDetail[],
) {
  return conversations.map((conversation) => ({
    ...conversation,
    messages: conversation.messages.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    ),
  }))
}

// Fonctions pour gérer le défilement automatique
export const scrollToBottom = (element: Element) => {
  if (!element) return
  element.scroll({
    top: element.scrollHeight,
  })
}

export const scrollToSelected = (element: Element) => {
  if (!element) return
  const list = document.querySelector(`[data-js="chat-list"]`) as HTMLElement
  if (list && element instanceof HTMLElement) {
    list.scrollTop = element.offsetTop - list.offsetTop
  }
}