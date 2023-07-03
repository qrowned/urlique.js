import { getServerSession } from "next-auth/next"

import { authOptions } from "./auth"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  return session?.user
}

export async function getCurrentServerSession() {
  return await getServerSession(authOptions)
}

export async function checkSessionPermission(
  permission?: string
): Promise<boolean> {
  const user = await getCurrentUser()

  return checkPermission(user, permission)
}

export function checkPermission(user: any, permission?: string): boolean {
  if (!permission) return true

  return true
  /*
  return (
    user?.permissions.includes("ALL_RIGHTS") ||
    user?.permissions.includes(permission)
  )
  */
}
