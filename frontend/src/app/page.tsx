import { redirect } from "next/navigation"

export default function Page() {
  redirect("/articles?page=1")
}