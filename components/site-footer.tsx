import Link from "next/link"

import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="bg-background border-t">
      <div className="place-items-center grid items-center mb-10">
        <Link
          href={siteConfig.links.github}
          className="max-w-lg pt-5 mt-4 text-base font-medium text-gray-400"
        >
          &copy; Luca Bartmann 2023
        </Link>
        <div className="mt-4">
          <Link href="/legal" className="mr-2 text-sm max-w-lg text-gray-400">
            Legal notice
          </Link>
          <Link href="/privacy" className="text-sm max-w-lg text-gray-400">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
