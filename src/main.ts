import { HeaderElement } from "./components/Header"
import "./main-style.scss"

// document.querySelector<HTMLDivElement>('[data-js="app"]')!.innerHTML = `
//   <div>
//     Vite + TypeScript
//   </div>
// `

const App = document.querySelector<HTMLDivElement>('[data-js="app"]')
App?.appendChild(HeaderElement)