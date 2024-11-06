import { dc, sanitizeInput } from "@/helpers/helpers"

type InputWrapperProps = {
  renderNames: () => void
  hideList: () => void
}

export const InputWrapper = ({ renderNames, hideList }: InputWrapperProps) => {
  const SearchInput = dc("input") as HTMLInputElement
  SearchInput.type = "text"
  setTimeout(() => {
    SearchInput.focus()
  }, 0)
  SearchInput.setAttribute("placeholder", "first name or last name")
  SearchInput.classList.add("search-input")
  SearchInput.addEventListener("keyup", (event) => {
    SearchInput.value === "" ? renderNames() : hideList()
    sanitizeInput(SearchInput)
    const searchTerm = SearchInput.value.toLowerCase()

    if (event.key === "Enter") {
      const allFriends = document.querySelectorAll<HTMLLIElement>(
        '[data-js="friend-item"]',
      )
      const friendsArray = Array.from(allFriends)

      friendsArray.forEach((friend) => {
        const [firstName, lastName] = friend.innerText.toLowerCase().split(" ")
        const isMatch =
          firstName.includes(searchTerm) || lastName.includes(searchTerm)

        if (searchTerm === "") {
          friend.classList.remove("display-none")
        } else {
          friend.classList.toggle("display-none", !isMatch)
          const skeletons = document.querySelectorAll(
            '[data-js="skeletonElement"]',
          )
          if (searchTerm !== "") {
            skeletons.forEach((skeleton) => skeleton.remove())
          }
        }
      })
    }
  })
  const wrapperDiv = dc("div")
  wrapperDiv.appendChild(SearchInput)
  wrapperDiv.classList.add("search-input-wrapper")

  return wrapperDiv
}