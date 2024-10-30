import "./FeedPage.style.scss"
import { dc } from "../helpers/helpers"
import postList from "../helpers/posts.json"

interface CommentProps {
  comment_id: string
  comment_author_id: string
  content: string
}

interface AuthorProps {
  author_id: string
  first_name: string
  last_name: string
  photo: string
}

interface PostProps {
  author: AuthorProps
  image: string
  content: string
  comments: CommentProps[]
}

const createCard = (post: PostProps) => {
  const CommentsWrapper = dc("div")
  CommentsWrapper.classList.add("feed-page__comments-wrapper")

  post.comments.map((commentData) => {
    const Comment = dc("span")
    Comment.textContent = commentData.content
    CommentsWrapper.appendChild(Comment)
  })

  // ------------------- Author Info (name & photo) --------------
  const AuthorFirsName = dc("span")
  AuthorFirsName.textContent = post.author.first_name

  const AuthorPhoto = dc("img") as HTMLImageElement
  AuthorPhoto.classList.add("feed-page__author-photo")
  AuthorPhoto.setAttribute("data-js", "postImage")
  AuthorPhoto.src = post.author.photo

  const AuthorInfo = dc("div")
  AuthorInfo.classList.add("feed-page__author-info")
  AuthorInfo.appendChild(AuthorPhoto)
  AuthorInfo.appendChild(AuthorFirsName)

  // ------------------ Post Content  ------------------
  const PostContent = dc("p")
  PostContent.textContent = post.content

  const PostImg = dc("img") as HTMLImageElement
  PostImg.classList.add("feed-page__post-image")
  PostImg.setAttribute("data-js", "postImage")
  PostImg.src = post.image

  // ------------------ Definição do Card ------------------
  const Card = dc("section")
  Card.setAttribute("data-js", "feed-card")
  Card.setAttribute("data-author", post.author.author_id)
  Card.classList.add("feed-page__card")

  Card.appendChild(AuthorInfo)
  Card.appendChild(PostImg)
  Card.appendChild(PostContent)
  Card.appendChild(CommentsWrapper)

  return Card
}

export const FeedPage = dc("div")
FeedPage.setAttribute("data-js", "feed-page")
FeedPage.classList.add("feed-page")

postList.map((post) => {
  const Card = createCard(post)
  FeedPage.appendChild(Card)
})