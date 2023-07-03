"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { UrlData } from "@prisma/client"

export default function RedirectCountdown({ urlData }: { urlData: UrlData }) {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)

      return () => clearTimeout(timer)
    } else {
      submitForm(urlData)
    }
  }, [countdown])

  return <h2 className="text-center font-bold text-3xl">{countdown}</h2>
}
function submitForm(data: UrlData) {
  redirect(data.url)
}
