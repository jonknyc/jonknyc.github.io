import { Welcome } from "../welcome/welcome"
import type { Route } from "./+types/home"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Jonathan Kennell" },
    { name: "description", content: "Jonathan Kennell's personal website" },
  ]
}

export default function Home() {
  return <Welcome />
}
