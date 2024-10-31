import "./Modal-style.scss"
import { dc } from "../helpers/helpers"
const App = document.querySelector<HTMLDivElement>('[data-js="app"]')

const ModalButton = dc("button")
ModalButton.textContent = "Close"
ModalButton.addEventListener("click", closeModal)
ModalButton.classList.add("modal-button")

const ModalImage = dc("img")
ModalImage.setAttribute("alt", "post image")

export const Modal = dc("div")
Modal.setAttribute("data-js", "modal")
Modal.classList.add("modal")
Modal.classList.add("display-none")
Modal.appendChild(ModalImage)
Modal.appendChild(ModalButton)

export function openModal(src: string) {
  const Cards = document.querySelectorAll<HTMLDivElement>(
    '[data-js="feed-card"]',
  )

  ModalImage.setAttribute("src", src)
  App?.classList.add("app-dark")
  Cards.forEach((c) => c.classList.add("display-none"))
  Modal?.classList.remove("display-none")
}

function closeModal() {
  const Cards = document.querySelectorAll<HTMLDivElement>(
    '[data-js="feed-card"]',
  )

  App?.classList.remove("app-dark")
  Cards.forEach((c) => c.classList.remove("display-none"))
  Modal?.classList.add("display-none")
}