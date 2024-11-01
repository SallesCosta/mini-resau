import "./Modal-style.scss"
import { dc, navigateTo } from "../helpers/helpers"

const App = document.querySelector<HTMLDivElement>('[data-js="app"]')

const ModalButton = dc("button")
ModalButton.textContent = "x"
ModalButton.addEventListener("click", closeModal)
ModalButton.classList.add("modal__close-button")

const ModalImage = dc("img")
ModalImage.setAttribute("alt", "post image")
ModalImage.classList.add("modal__image")

export const Modal = dc("div")
Modal.setAttribute("data-js", "modal")
Modal.classList.add("modal")
Modal.classList.add("display-none")
Modal.appendChild(ModalImage)
Modal.appendChild(ModalButton)

export function openModal(src: string, postId: number) {
  const Header = document.querySelector<HTMLDivElement>(
    '[data-js="headerElement"]',
  )

  const Cards = document.querySelectorAll<HTMLDivElement>(
    '[data-js="feed-card"]',
  )

  ModalImage.setAttribute("src", src)
  App?.classList.add("app-dark")
  Header?.classList.add("display-none")
  Cards.forEach((c) => c.classList.add("display-none"))
  Modal?.classList.remove("display-none")
  Modal?.setAttribute("data-postid", postId.toString())
}

function closeModal() {
  const Header = document.querySelector<HTMLDivElement>(
    '[data-js="headerElement"]',
  )

  const Cards = document.querySelectorAll<HTMLDivElement>(
    '[data-js="feed-card"]',
  )

  App?.classList.remove("app-dark")
  Header?.classList.remove("display-none")
  Cards.forEach((c) => c.classList.remove("display-none"))
  Modal?.classList.add("display-none")

  const postId = Modal?.getAttribute("data-postid")
  const postElement = document.querySelector<HTMLDivElement>(
    `[data-js="postImage-${postId}"]`,
  )
  navigateTo(postElement)
}