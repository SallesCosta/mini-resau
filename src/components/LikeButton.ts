import "./LikeButton.style.scss"
import { dc } from "../helpers/helpers"
import { HeartIcon, ThumbDown, ThumbUp } from "./SvgIcons"

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
      `[data-js="feed-card__reaction-wrapper__${postId}"]`,
    )

    if (CardWrapper) {
      const buttons = CardWrapper.querySelectorAll(".like-button")
      buttons.forEach((btn) => btn.classList.remove("active"))
    }

    button.classList.add("active")
  })
  return button
}