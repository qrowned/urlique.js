import { redirect } from "next/navigation"

import { fetchUrlEntry } from "@/lib/actions"
import RedirectCountdown from "@/components/redirect-coundown"

export default async function RedirectPage({
  params,
}: {
  params: { id: string }
}) {
  const data = await fetchUrlEntry(params.id)

  if (!data) {
    redirect("/")
  }

  return (
    <section className="py-20 container grid justify-center gap-6">
      <h1 className="font-extrabold bg-gradient-to-r from-red-500 to-indigo-600 bg-clip-text text-transparent text-6xl leading-tight">
        Redirecting you in
      </h1>
      <RedirectCountdown urlData={data} />
    </section>
  )
}
