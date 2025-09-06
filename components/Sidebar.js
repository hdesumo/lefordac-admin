import { useState, useEffect } from "react"
import { Home, Users, Image, Mail, MessageSquare, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "next-i18next"

export default function Sidebar({ currentPath }) {
  const { t } = useTranslation("common")
  const [open, setOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark")
      setDarkMode(true)
    }
  }, [])

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setDarkMode(false)
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setDarkMode(true)
    }
  }

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-2 rounded cursor-pointer transition-colors duration-200 ${
      currentPath === path
        ? "bg-lefordac-accent text-black font-semibold"
        : "hover:bg-lefordac-blue"
    }`

  return (
    <aside
      className={`${
        open ? "w-64" : "w-20"
      } bg-gray-800 dark:bg-gray-950 text-white h-screen fixed top-0 left-0 transition-all duration-300`}
    >
      <div className="flex justify-between items-center p-4">
        <h1 className={`text-lg font-bold text-lefordac-accent ${!open && "hidden"}`}>
          Admin
        </h1>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 hover:bg-gray-700 rounded"
        >
          {open ? "<" : ">"}
        </button>
      </div>

      <nav className="mt-6 space-y-2">
        <Link href="/">
          <div className={linkClass("/")}>
            <Home size={20} />
            {open && t("dashboard")}
          </div>
        </Link>
        <Link href="/contacts">
          <div className={linkClass("/contacts")}>
            <Mail size={20} />
            {open && t("contacts")}
          </div>
        </Link>
        <Link href="/gallery">
          <div className={linkClass("/gallery")}>
            <Image size={20} />
            {open && t("gallery")}
          </div>
        </Link>
        <Link href="/members">
          <div className={linkClass("/members")}>
            <Users size={20} />
            {open && t("members")}
          </div>
        </Link>
        <Link href="/messages">
          <div
            className={
              currentPath.startsWith("/messages")
                ? "flex items-center gap-3 px-4 py-2 rounded bg-lefordac-accent text-black font-semibold"
                : linkClass("/messages")
            }
          >
            <MessageSquare size={20} />
            {open && t("messages")}
          </div>
        </Link>
      </nav>

      <div className="absolute bottom-6 w-full px-4">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-3 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          {open && (darkMode ? "Mode clair" : "Mode sombre")}
        </button>
      </div>
    </aside>
  )
}
