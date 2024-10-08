export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Chulfay",
  description: "pagina web de chuflay",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Merchandise",
      href: "/pages/merchandise",
    },
   
    
    {
      label: "Blog",
      href: "/pages/blog",
    },

    {
      label: "Admin Panel",
      href: "/pages/admin_panel",
    },

    {
      label: "Login",
      href: "/pages/auth/login",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Merchandise",
      href: "/pages/merchandise",
    },
    
    {
      label: "Login",
      href: "/pages/login",
    },
    
    {
      label: "Blog",
      href: "/pages/blog",
    },

    {
      label: "Admin Panel",
      href: "/pages/admin_panel",
    },

    {
      label: "Logout",
      href: "/pages/admin_panel",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    instagram: "https://www.instagram.com/chuflay_oficial/",
    youtube: "https://www.youtube.com/@chuflay_oficial",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
