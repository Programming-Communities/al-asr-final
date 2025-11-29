export const themeConfig = {
  themes: [
    {
      name: "light" as const,
      label: "Light",
      background: "bg-white",
      text: "text-gray-900",
      primary: "bg-blue-600",
    },
    {
      name: "dark" as const,
      label: "Dark", 
      background: "bg-gray-900",
      text: "text-white",
      primary: "bg-blue-500",
    },
    {
      name: "amoled" as const,
      label: "AMOLED",
      background: "bg-black",
      text: "text-white", 
      primary: "bg-purple-600",
    },
    {
      name: "colorful" as const,
      label: "Colorful",
      background: "bg-gradient-to-br from-blue-400 to-purple-600",
      text: "text-white",
      primary: "bg-pink-500",
    },
  ],
}

export type Theme = typeof themeConfig.themes[number]["name"]
