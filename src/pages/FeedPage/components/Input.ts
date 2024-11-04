import "./Input.style.scss"
import {
  dc,
  sanitizeInput,
  uuid,
  userDataProps,
} from "../../../helpers/helpers"
import { CommentProps, PostProps } from "../FeedPage"

type InputProps = {
  userData: userDataProps
  post: PostProps
  renderComments: () => void
}

export const Input = ({ userData, post, renderComments }: InputProps) => {
  const CommentInput = dc("input") as HTMLInputElement
  CommentInput.type = "text"
  CommentInput.style.display = "none"
  CommentInput.classList.add("input")
  CommentInput.addEventListener("keyup", (event) => {
    sanitizeInput(CommentInput)
    if (event.key === "Enter") {
      addComment()
    }
  })

  const InputWrapper = dc("div")
  InputWrapper.appendChild(CommentInput)
  InputWrapper.classList.add("input-wrapper")

  const addComment = () => {
    if (CommentInput.value) {
      const sender: CommentProps = {
        comment_id: uuid(),
        comment_author_id: userData.userId,
        comment_author_photo: userData.mePhoto,
        comment_author_firstname: userData.firstName,
        comment_author_lastname: userData.lastName,
        content: CommentInput.value,
        replies: [],
      }

      post.comments.unshift(sender)
      CommentInput.value = ""
      renderComments()

      //hide input-wrapper after send data
      InputWrapper.style.display = "none"
    }
  }

  return { InputWrapper, CommentInput }
}