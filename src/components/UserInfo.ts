import "./UserInfo.scss"
import { dc } from "../helpers/helpers"

export const UserInfo = (
  firstName: string,
  imgUrl: string,
  lastName?: string,
) => {
  const FirsName = dc("b")
  FirsName.textContent = firstName
  FirsName.classList.add("first-name")

  const UserPhoto = dc("img") as HTMLImageElement
  UserPhoto.classList.add("user-photo")
  UserPhoto.setAttribute("data-js", "authorImage")
  UserPhoto.src = imgUrl

  const userInfo = dc("div")
  userInfo.classList.add("user-info")
  userInfo.appendChild(UserPhoto)
  userInfo.appendChild(FirsName)

  if (lastName) {
    const LastName = dc("b")
    LastName.textContent = lastName
    userInfo.appendChild(LastName)
  }

  return userInfo
}