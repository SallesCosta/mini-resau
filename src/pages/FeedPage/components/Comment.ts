import "./Comment.style.scss"
import "./Input.style.scss"
import {
  commentUserName,
  dc,
  sanitizeInput,
  userData,
  uuid,
} from "../../../helpers/helpers"
import { CommentProps, Reply } from "../FeedPage"
import { UserInfo } from "../../../components/UserInfo"

export const Comment = (data: CommentProps) => {
  const CommentWrapper = dc("div")
  CommentWrapper.classList.add("comment")

  const FirstCommentWrapper = dc("div")
  FirstCommentWrapper.classList.add("comment__first-comment-wrapper")

  const CommentText = dc("p")
  CommentText.textContent = data.content

  const ReplyButton = dc("button")
  ReplyButton.textContent = "+"
  ReplyButton.classList.add("comment__first-comment-button")

  const ReplyInput = dc("input") as HTMLInputElement
  ReplyInput.type = "text"
  ReplyInput.style.display = "none"
  ReplyInput.classList.add("input")
  ReplyInput.addEventListener("keyup", (event) => {
    sanitizeInput(ReplyInput)
    if (event.key === "Enter") {
      addReply()
    }
  })

  const InputWrapper = dc("div")
  InputWrapper.appendChild(ReplyInput)
  InputWrapper.classList.add("input-wrapper")

  const ReplyList = dc("ul")
  ReplyList.classList.add("comment__reply-list")

  let isReplying = false

  const addReply = () => {
    if (ReplyInput.value) {
      const sender: Reply = {
        reply_id: uuid(),
        reply_author_id: userData.userId,
        content: ReplyInput.value,
      }

      data.replies.push(sender)
      ReplyInput.value = ""
      renderReplies()

      //hide input-wrapper after send data
      InputWrapper.style.display = "none"
    }
  }

  const ListItem = (content: string, userName: string, userImg: string) => {
    const listItem = dc("li")
    listItem.classList.add("comment__reply-item")

    const formatedUserName = `${userName}:`
    listItem.appendChild(UserInfo(formatedUserName, userImg))

    const contentElement = dc("span")
    contentElement.textContent = content

    listItem.appendChild(contentElement)

    return listItem
  }

  const renderReplies = () => {
    ReplyList.innerHTML = ""
    data.replies.forEach((replyText) => {
      ReplyList.appendChild(
        ListItem(replyText.content, commentUserName, userData.mePhoto),
      )
    })
  }

  ReplyButton.addEventListener("click", () => {
    isReplying = !isReplying
    InputWrapper.style.display = isReplying ? "block" : "none"
    ReplyInput.style.display = isReplying ? "block" : "none"
    ReplyInput.focus()
  })

  renderReplies()

  const infoWrapper = dc("div")
  infoWrapper.classList.add("comment__info")
  const commentAuthorName = `${data.comment_author_firstname} ${data.comment_author_lastname}: `

  infoWrapper.appendChild(
    UserInfo(commentAuthorName, data.comment_author_photo),
  )

  infoWrapper.appendChild(CommentText)

  FirstCommentWrapper.appendChild(infoWrapper)
  FirstCommentWrapper.appendChild(ReplyButton)

  CommentWrapper.appendChild(FirstCommentWrapper)
  CommentWrapper.appendChild(ReplyList)
  CommentWrapper.appendChild(InputWrapper)

  return CommentWrapper
}