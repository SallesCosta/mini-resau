import "./Reactions.style.scss"
import { LikeButton } from "../../../components/LikeButton"
import { PlusIcon } from "../../../components/SvgIcons"
import { dc } from "../../../helpers/helpers"

export const ReactionsWrapper = (
  postId: number,
  renderComments: any,
  firstElement: any,
  secondElement: any,
) => {
  const addCommentButton = () => {
    const button = dc("button")
    button.classList.add("comment-button")
    button.innerHTML = `
    ${PlusIcon()}
  `
    return button
  }

  let isCommenting = false
  const AddCommentButton = addCommentButton()
  AddCommentButton.setAttribute("data-js", "feed-card")
  AddCommentButton.addEventListener("click", () => {
    isCommenting = !isCommenting

    firstElement.style.display = isCommenting ? "block" : "none"
    secondElement.style.display = isCommenting ? "block" : "none"
    secondElement.focus()
  })

  renderComments()

  const reactionsWrapper = dc("div")
  reactionsWrapper.setAttribute(
    "data-js",
    `feed-card__reaction-wrapper__${postId}`,
  )

  reactionsWrapper.classList.add("reactions-wrapper")
  const ReactionsWrapperInternal = dc("div")
  ReactionsWrapperInternal.classList.add("reactions")
  ReactionsWrapperInternal.appendChild(LikeButton("like", postId))
  ReactionsWrapperInternal.appendChild(LikeButton("dislike", postId))
  ReactionsWrapperInternal.appendChild(LikeButton("heart", postId))

  reactionsWrapper.appendChild(ReactionsWrapperInternal)
  reactionsWrapper.appendChild(AddCommentButton)

  return reactionsWrapper
}