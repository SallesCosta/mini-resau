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

export const userData = { firstName, lastName, mePhoto, userId: uuid() }

function brefName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName.charAt(0).toUpperCase()}.`
}

export const commentUserName = brefName(firstName, lastName)