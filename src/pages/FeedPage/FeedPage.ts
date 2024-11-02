import "./FeedPage.style.scss"
import "./components/Comment.style.scss"

import "../../components/Modal-style.scss"
import { dc, userData, uuid } from "../../helpers/helpers"
import postList from "../../helpers/posts.json"
import { openModal, Modal } from "../../components/Modal"
import { LikeButton, PlusIcon } from "../../components/LikeButton"
import { Comment } from "./components/Comment"

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
  author: AuthorProps
  image: string
  content: string
  comments: CommentProps[]
}

const createCard = (post: PostProps) => {
  const CommentInput = document.createElement("input")
  CommentInput.type = "text"
  CommentInput.style.display = "none"
  CommentInput.classList.add("comment__input")
  CommentInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      addComment()
    }
  })

  const InputWrapper = dc("div")
  InputWrapper.appendChild(CommentInput)
  InputWrapper.classList.add("comment__input-wrapper")

  const AddCommentButton = dc("button")
  AddCommentButton.classList.add("comment-button")
  AddCommentButton.appendChild(PlusIcon())

  let isCommenting = false

  const addComment = () => {
    console.log("addComment..")
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
  ReactionsWrapper.appendChild(LikeButton("like", post.post_id))
  ReactionsWrapper.appendChild(LikeButton("dislike", post.post_id))
  ReactionsWrapper.appendChild(LikeButton("heart", post.post_id))
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