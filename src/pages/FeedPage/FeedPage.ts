import "./FeedPage.style.scss"
import "../../components/Modal-style.scss"
import { dc } from "../../helpers/helpers"
import postList from "../../helpers/posts.json"
import { openModal, Modal } from "../../components/Modal"
import { LikeButton } from "../../components/LikeButton"
import { Comment } from "./components/Comment"

export interface Reply {
  reply_id: string
  reply_author_id: string
  content: string
}

export interface CommentProps {
  comment_id: string
  comment_author_id: string
  content: string
  replies: Reply[] // Array de objetos Reply
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
  const CommentsWrapper = dc("section")
  CommentsWrapper.classList.add("feed-page__comments-wrapper")

  post.comments.map((commentData) => {
    CommentsWrapper.appendChild(Comment(commentData))
  })

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

  const ReactionsWrapper = dc("div")
  ReactionsWrapper.setAttribute(
    "data-js",
    `feed-card__reation-wrapper__${post.post_id}`,
  )
  ReactionsWrapper.classList.add("feed-page__reactions-wrapper")
  ReactionsWrapper.appendChild(LikeButton("like", post.post_id))
  ReactionsWrapper.appendChild(LikeButton("dislike", post.post_id))
  ReactionsWrapper.appendChild(LikeButton("heart", post.post_id))

  const AnchorToScroll = dc("div")
  AnchorToScroll.setAttribute("data-js", `postImage-${post.post_id}`)

  Card.appendChild(AuthorInfo)
  if (post.image !== "") {
    Card.appendChild(PostImg)
  }
  Card.appendChild(PostContent)
  Card.appendChild(ReactionsWrapper)
  Card.appendChild(CommentsWrapper)
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