import { Icons } from "@/components/icons"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  permission?: string
} & {
  href: string
  items?: never
}

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[]
}
