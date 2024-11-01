import "./LikeButton.style.scss"
import { dc } from "../helpers/helpers"

const HeartIcon = () => `
  <svg class="heart" width="24" height="24" viewBox="0 0 24 24">
    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
  </svg>
`

const ThumbDown = () => `
  <svg class="heart" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/>
  </svg>
`

const ThumbUp = () => `
  <svg class="heart" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" >
    <path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>
  </svg>
`

type SvgIconProps = "heart" | "dislike" | "like"

const SvgIcon = (icon: SvgIconProps) => {
  return {
    heart: HeartIcon(),
    dislike: ThumbDown(),
    like: ThumbUp(),
  }[icon]
}

export const LikeButton = (icon: SvgIconProps, postId: number) => {
  const button = dc("button")
  button.classList.add("like-button")

  button.innerHTML = `
    <div class="like-wrapper">
      <div class="ripple"></div>
      ${SvgIcon(icon)}
      <div class="particles" style="--total-particles: 6">
        <div class="particle" style="--i: 1; --color: #7642F0"></div>
        <div class="particle" style="--i: 2; --color: #AFD27F"></div>
        <div class="particle" style="--i: 3; --color: #DE8F4F"></div>
        <div class="particle" style="--i: 4; --color: #D0516B"></div>
        <div class="particle" style="--i: 5; --color: #5686F2"></div>
        <div class="particle" style="--i: 6; --color: #D53EF3"></div>
      </div>
    </div>
  `

  button.addEventListener("click", () => {
    const CardWrapper = document.querySelector<HTMLDivElement>(
      `[data-js="feed-card__reation-wrapper__${postId}"]`,
    )

    if (CardWrapper) {
      const buttons = CardWrapper.querySelectorAll(".like-button")
      buttons.forEach((btn) => btn.classList.remove("active"))
    }

    button.classList.add("active")
  })
  return button
}