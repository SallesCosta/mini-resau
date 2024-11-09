// Importation des styles et composants nécessaires
import "./FeedPage.style.scss"
import "./components/Comment.style.scss"
import "@/components/Modal.style.scss"
import postList from "@/helpers/posts.json"
import { Comment } from "./components/Comment"
import { ReactionsWrapper } from "./components/Reactions"
import { Post } from "./components/Post"
import { Input } from "./components/Input"
import { dc, userData } from "@/helpers/helpers"
import { Modal } from "@/components/Modal"

// Interface pour définir la structure d'une réponse à un commentaire
export interface Reply {
  reply_id: string
  reply_author_id: string
  content: string
}

// Interface pour définir la structure d'un commentaire
export interface CommentProps {
  comment_id: string
  comment_author_id: string
  comment_author_photo: string
  comment_author_firstname: string
  comment_author_lastname: string
  content: string
  replies: Reply[]
}

// Interface pour définir la structure d'un auteur de post
interface AuthorProps {
  author_id: string
  first_name: string
  last_name: string
  photo: string
}

// Interface pour définir la structure complète d'un post
export interface PostProps {
  post_id: number
  image: string
  content: string
  author: AuthorProps
  comments: CommentProps[]
}

// Fonction pour créer une carte de post avec tous ses éléments
const createCard = (post: PostProps) => {
  const CommentsList = dc("section")
  CommentsList.classList.add("feed-page__comments-wrapper")

  const Card = dc("section")
  Card.setAttribute("data-js", "feed-card")
  Card.setAttribute("data-author", post.author.author_id)
  Card.classList.add("feed-page__card")

  // Fonction pour rafraîchir l'affichage des commentaires
  const renderComments = () => {
    CommentsList.innerHTML = ""
    post.comments.map((commentData) => {
      CommentsList.appendChild(Comment(commentData))
    })
  }

  // Création des composants d'interaction (input, réactions, etc.)
  const { InputWrapper, CommentInput } = Input({
    userData,
    post,
    renderComments,
  })

  const reactionsWrapper = ReactionsWrapper(
    post.post_id,
    renderComments,
    InputWrapper,
    CommentInput,
  )
  const AnchorToScroll = dc("div")
  AnchorToScroll.setAttribute("data-js", `postImage-${post.post_id}`)

  const postData = {
    post_id: post.post_id,
    image: post.image,
    content: post.content,
    author: post.author,
  }

  // Création des éléments du post (info auteur, contenu, image)
  const { AuthorInfo, PostContent, PostImg } = Post(postData)

  // Assemblage de tous les éléments de la carte
  Card.appendChild(AuthorInfo)
  if (post.image !== "") {
    Card.appendChild(PostImg)
  }
  Card.appendChild(PostContent)
  Card.appendChild(reactionsWrapper)
  Card.appendChild(InputWrapper)
  Card.appendChild(CommentsList)
  Card.appendChild(AnchorToScroll)

  return Card
}

// Création et configuration de la page principale du feed
export const FeedPage = dc("div")
FeedPage.setAttribute("data-js", "feed-page")
FeedPage.classList.add("feed-page")
FeedPage.appendChild(Modal)

// Création et ajout de toutes les cartes de posts à la page
postList.map((post) => {
  const Card = createCard(post)
  FeedPage.appendChild(Card)
})