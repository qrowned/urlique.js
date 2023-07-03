import { UrlData } from "@prisma/client"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

import { columns } from "./columns"
import { DataTable } from "./data-table"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  const data: UrlData[] = await db.urlData.findMany({
    where: { creator_id: user?.id },
  })

  if (data == null) return <p>Error</p>

  return (
    <section className="p-10">
      <DataTable columns={columns} data={data} />
    </section>
  )
}
