export const siteConfig = {
  name: "Al-Asr",
  description: "Multi-language news portal with modern features",
  url: "https://your-domain.com",
  ogImage: "https://your-domain.com/og.jpg",
  links: {
    twitter: "https://twitter.com/your-site",
    github: "https://github.com/your-repo",
  },
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Posts",
      href: "/posts",
    },
    {
      title: "Categories",
      href: "/categories",
    },
    {
      title: "About",
      href: "/about",
    },
  ],
}

export type SiteConfig = typeof siteConfig
