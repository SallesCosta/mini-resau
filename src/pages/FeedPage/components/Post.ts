import "./Posts.style.scss"
import { openModal } from "../../../components/Modal"
import { UserInfo } from "../../../components/UserInfo"
import { dc } from "../../../helpers/helpers"
import { PostProps } from "../FeedPage"

type PartialPost = Omit<PostProps, "comments">

export const Post = ({ post_id, image, content, author }: PartialPost) => {
  const AuthorInfo = UserInfo(author.first_name, author.photo)

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