import "./Comment.style.scss"
import { commentUserName, dc, userData, uuid } from "../../../helpers/helpers"
import { CommentProps, Reply } from "../FeedPage"

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

  const ReplyInput = document.createElement("input")
  ReplyInput.type = "text"
  ReplyInput.style.display = "none"
  ReplyInput.classList.add("comment__input")
  ReplyInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      addReply()
    }
  })

  const InputWrapper = dc("div")
  InputWrapper.appendChild(ReplyInput)
  InputWrapper.classList.add("comment__input-wrapper")

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

    listItem.innerHTML = `
    <div class='comment__user-info''>
      <img src=${userImg} alt='user image' class='comment__user-photo'/>
      <span>${userName}</span>
    </div>
    <span>${content}</span>
`
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
  FirstCommentWrapper.appendChild(CommentText)
  FirstCommentWrapper.appendChild(ReplyButton)

  CommentWrapper.appendChild(FirstCommentWrapper)
  CommentWrapper.appendChild(ReplyList)
  CommentWrapper.appendChild(InputWrapper)

  return CommentWrapper
}