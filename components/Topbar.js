import { useEffect, useState } from "react"
import { LogOut, User, Globe } from "lucide-react"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"

export default function Topbar() {
  const { t } = useTranslation("common")
  const router = useRouter()
  const [language, setLanguage] = useState("fr")
  const user = { name: "Admin FORDAC" }

  useEffect(() => {
    if (router.locale) setLanguage(router.locale)
  }, [router.locale])

  const handleLanguageChange = (e) => {
    const lang = e.target.value
    router.push(router.pathname, router.asPath, { locale: lang })
    setLanguage(lang)
  }

  const handleLogout = () => {
    alert("Déconnexion en cours...")
  }

  return (
    <header className="h-16 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-6 fixed top-0 left-64 right-0 z-10">
      <h1 className="text-xl font-bold text-lefordac-blue dark:text-lefordac-accent">
        FORDAC Admin
      </h1>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Globe size={18} className="text-gray-600 dark:text-gray-300" />
          <select
            value={language}
            onChange={handleLanguageChange}
            className="border rounded px-2 py-1 dark:bg-gray-900 dark:text-gray-200"
          >
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <User size={20} />
          <span className="text-gray-700 dark:text-gray-200 font-medium">
            {user.name}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 transition"
        >
          <LogOut size={18} />
          <span>{t("logout")}</span>
        </button>
      </div>
    </header>
  )
}
