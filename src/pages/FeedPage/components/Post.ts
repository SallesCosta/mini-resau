import "./Posts.style.scss"
import { openModal } from "../../../components/Modal"
import { dc } from "../../../helpers/helpers"
import { PostProps } from "../FeedPage"

type PartialPost = Omit<PostProps, "comments">

export const Post = ({ post_id, image, content, author }: PartialPost) => {
  const AuthorFirsName = dc("span")
  AuthorFirsName.textContent = author.first_name

  const AuthorPhoto = dc("img") as HTMLImageElement
  AuthorPhoto.classList.add("author-photo")
  AuthorPhoto.setAttribute("data-js", "authorImage")
  AuthorPhoto.src = author.photo

  const AuthorInfo = dc("div")
  AuthorInfo.classList.add("author-info")
  AuthorInfo.appendChild(AuthorPhoto)
  AuthorInfo.appendChild(AuthorFirsName)

  const PostContent = dc("p")
  PostContent.classList.add("post-content")
  PostContent.textContent = content

  const PostImg = dc("img") as HTMLImageElement
  PostImg.classList.add("post-image")
  PostImg.src = image
  PostImg.addEventListener("click", () => {
    openModal(image, post_id)
  })

  return { AuthorInfo, PostContent, PostImg }
}