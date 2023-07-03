import { notFound } from "next/navigation"

import { SidebarNavItem } from "@/types/nav"
import { dashboardConfig } from "@/config/dashboard"
import { checkPermission, getCurrentUser } from "@/lib/session"
import { DashboardNav } from "@/components/dashboard-nav"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  const sidebarItems: SidebarNavItem[] = dashboardConfig.sidebarNav.filter(
    (item) => {
      return checkPermission(user, item.permission)
    }
  )

  return (
    <div className="mt-10 container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
      <aside className="hidden w-[200px] flex-col md:flex">
        <DashboardNav items={sidebarItems} user={user} />
      </aside>
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  )
}
