export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "urlique",
  baseUrl: process.env.NEXTAUTH_URL,
  description: "Simple url shortener for the real guys.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/qrowned",
    docs: "https://ui.shadcn.com",
  },
}
