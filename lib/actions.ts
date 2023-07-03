"use server"

import { UrlData } from "@prisma/client"

import { db } from "./db"
import { getCurrentUser } from "./session"

export async function pushUrlEntry(url: string): Promise<UrlData | undefined> {
  const user = await getCurrentUser()

  if (!user) return

  const data = await db.urlData.create({
    data: {
      url: url,
      creator_id: user.id,
      display_id: makeid(5),
      created_at: new Date(),
    },
  })

  return data
}

export async function fetchUrlEntry(displayId: string) {
  const user = await getCurrentUser()

  if (!user) return

  const data = await db.urlData.findFirst({
    where: { display_id: displayId },
  })

  if (data) {
    data.requests++

    await db.urlData.update({
      where: { id: data.id },
      data: data,
    })
  }

  return data
}

export async function deleteUrlEntry(id: string) {
  const user = await getCurrentUser()

  if (!user) return

  await db.urlData.delete({
    where: {
      id: id,
    },
  })
}

function makeid(length: number) {
  let result = ""
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}
