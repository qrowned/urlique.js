import { Badge } from "@/components/ui/badge"
import { LinkSubmitForm } from "@/components/link-submit-form"

export default async function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col items-center gap-2 pt-10">
        <Badge className="bg-orange-400 hover:bg-orange-500">
          Hosted in Nuremberg
        </Badge>
        <h1 className="font-extrabold bg-gradient-to-r from-red-500 to-indigo-600 bg-clip-text text-transparent text-6xl leading-tight">
          URLIQUE
        </h1>
        <p className="text-lg text-muted-foreground font-medium">
          Your simple URL-Shortener generating passive income!
        </p>
      </div>
      <div className="mt-10 flex flex-col items-center px-40">
        <LinkSubmitForm />
      </div>
    </section>
  )
}
