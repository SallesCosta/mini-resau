import "./FeedPage.style.scss"
import "./components/Comment.style.scss"

import "../../components/Modal-style.scss"
import { dc, sanitizeInput, userData, uuid } from "../../helpers/helpers"
import postList from "../../helpers/posts.json"
import { openModal, Modal } from "../../components/Modal"
import { LikeButton } from "../../components/LikeButton"
import { Comment } from "./components/Comment"
import { PlusIcon } from "../../components/SvgIcons"

export interface Reply {
  reply_id: string
  reply_author_id: string
  content: string
}

export interface CommentProps {
  comment_id: string
  comment_author_id: string
  comment_author_photo: string
  comment_author_firstname: string
  comment_author_lastname: string
  content: string
  replies: Reply[]
}

interface AuthorProps {
  author_id: string
  first_name: string
  last_name: string
  photo: string
}

interface PostProps {
  post_id: number
  image: string
  content: string
  author: AuthorProps
  comments: CommentProps[]
}

const createCard = (post: PostProps) => {
  const CommentInput = document.createElement("input")
  CommentInput.type = "text"
  CommentInput.style.display = "none"
  CommentInput.classList.add("comment__input")
  CommentInput.addEventListener("keyup", (event) => {
    sanitizeInput(CommentInput)
    if (event.key === "Enter") {
      addComment()
    }
  })

  const InputWrapper = dc("div")
  InputWrapper.appendChild(CommentInput)
  InputWrapper.classList.add("comment__input-wrapper")

  const addCommentButton = () => {
    const button = dc("button")
    button.classList.add("comment-button")
    button.innerHTML = `
    ${PlusIcon()}
  `
    return button
  }

  let isCommenting = false

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

  const CommentsList = dc("section")
  CommentsList.classList.add("feed-page__comments-wrapper")

  // ------------------- Author Info (name & photo) --------------
  const AuthorFirsName = dc("span")
  AuthorFirsName.textContent = post.author.first_name

  const AuthorPhoto = dc("img") as HTMLImageElement
  AuthorPhoto.classList.add("feed-page__author-photo")
  AuthorPhoto.setAttribute("data-js", "authorImage")
  AuthorPhoto.src = post.author.photo

  const AuthorInfo = dc("div")
  AuthorInfo.classList.add("feed-page__author-info")
  AuthorInfo.appendChild(AuthorPhoto)
  AuthorInfo.appendChild(AuthorFirsName)

  // ------------------ Post Content  --------------------------
  const PostContent = dc("p")
  PostContent.classList.add("feed-page__post-content")
  PostContent.textContent = post.content

  const PostImg = dc("img") as HTMLImageElement
  PostImg.classList.add("feed-page__post-image")
  PostImg.src = post.image
  PostImg.addEventListener("click", () => {
    openModal(post.image, post.post_id)
  })

  const Card = dc("section")
  Card.setAttribute("data-js", "feed-card")
  Card.setAttribute("data-author", post.author.author_id)
  Card.classList.add("feed-page__card")

  const renderComments = () => {
    CommentsList.innerHTML = ""
    post.comments.map((commentData) => {
      CommentsList.appendChild(Comment(commentData))
    })
  }

  const AddCommentButton = addCommentButton()
  AddCommentButton.setAttribute("data-js", "feed-card")
  AddCommentButton.addEventListener("click", () => {
    isCommenting = !isCommenting

    InputWrapper.style.display = isCommenting ? "block" : "none"
    CommentInput.style.display = isCommenting ? "block" : "none"
    CommentInput.focus()
  })

  renderComments()

  const ReactionsWrapper = dc("div")
  ReactionsWrapper.setAttribute(
    "data-js",
    `feed-card__reaction-wrapper__${post.post_id}`,
  )

  ReactionsWrapper.classList.add("feed-page__reactions-wrapper")
  const ReactionsWrapperInternal = dc("div")
  ReactionsWrapperInternal.classList.add("feed-page__reactions")
  ReactionsWrapperInternal.appendChild(LikeButton("like", post.post_id))
  ReactionsWrapperInternal.appendChild(LikeButton("dislike", post.post_id))
  ReactionsWrapperInternal.appendChild(LikeButton("heart", post.post_id))

  ReactionsWrapper.appendChild(ReactionsWrapperInternal)
  ReactionsWrapper.appendChild(AddCommentButton)

  const AnchorToScroll = dc("div")
  AnchorToScroll.setAttribute("data-js", `postImage-${post.post_id}`)

  Card.appendChild(AuthorInfo)
  if (post.image !== "") {
    Card.appendChild(PostImg)
  }
  Card.appendChild(PostContent)
  Card.appendChild(ReactionsWrapper)
  Card.appendChild(InputWrapper)
  Card.appendChild(CommentsList)
  Card.appendChild(AnchorToScroll)

  return Card
}

export const FeedPage = dc("div")
FeedPage.setAttribute("data-js", "feed-page")
FeedPage.classList.add("feed-page")
FeedPage.appendChild(Modal)

postList.map((post) => {
  const Card = createCard(post)
  FeedPage.appendChild(Card)
})