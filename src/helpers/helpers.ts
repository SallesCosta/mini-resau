import me from "./me.json"

export const uuid = () => {
  const head = Date.now().toString(36)
  const tail = Math.random().toString(36).substr(2)

  return head + tail
}

export const dc = (element: string) => {
  return document.createElement(element)
}

export const navigateTo = (element: Element | null) => {
  if (!element) return
  element.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center",
  })
}

const firstName = me.first_name
const lastName = me.last_name
const mePhoto = me.photo

export type userDataProps = {
  firstName: string
  lastName: string
  mePhoto: string
  userId: string
}

export const userData: userDataProps = {
  firstName,
  lastName,
  mePhoto,
  userId: uuid(),
}

function brefName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName.charAt(0).toUpperCase()}.`
}

export const commentUserName = brefName(firstName, lastName)

export const sanitizeInput = (input: HTMLInputElement) => {
  const allowedChars = /^[a-zA-Z0-9\s.,!?]*$/

  if (!allowedChars.test(input.value)) {
    input.value = input.value.replace(/[^a-zA-Z0-9\s.,!?]/g, "")
    alert("Invalid characters have been removed.")
  }
}

export function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp)

  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0") // Mês é 0-indexado
  const year = date.getFullYear()

  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")

  return `${day}/${month}/${year} ${hours}:${minutes}`
}