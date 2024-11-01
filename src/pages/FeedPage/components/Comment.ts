import { dc } from "../../../helpers/helpers"
import { CommentProps, Reply } from "../FeedPage"

export const Comment = (data: CommentProps) => {
  const comment = dc("div")

  const commentText = dc("p")
  commentText.textContent = data.content

  const replyButton = dc("button")
  replyButton.textContent = "Comentar"

  const replyInput = document.createElement("input")
  replyInput.type = "text"
  replyInput.style.display = "none"

  const replyList = dc("ul")

  let isReplying = false

  const addReply = () => {
    if (replyInput.value) {
      const sender: Reply = {
        reply_id: "ufidos",
        reply_author_id: "383838",
        content: replyInput.value,
      }
      data.replies.push(sender)
      replyInput.value = ""
      renderReplies()
    }
  }

  const renderReplies = () => {
    replyList.innerHTML = ""
    data.replies.forEach((replyText) => {
      const replyItem = dc("li")
      replyItem.textContent = replyText.content
      replyList.appendChild(replyItem)
    })
  }

  replyButton.addEventListener("click", () => {
    isReplying = !isReplying
    replyInput.style.display = isReplying ? "block" : "none"
  })

  replyInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      addReply()
    }
  })

  renderReplies()

  comment.appendChild(commentText)
  comment.appendChild(replyButton)
  comment.appendChild(replyInput)
  comment.appendChild(replyList)

  return comment
}