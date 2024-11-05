import "./Skeleton.scss"
export const createSkeleton = (width: string, height: string) => {
  const skeleton = document.createElement("div")
  skeleton.style.width = width
  skeleton.style.height = height
  skeleton.classList.add("skeleton")

  return skeleton
}