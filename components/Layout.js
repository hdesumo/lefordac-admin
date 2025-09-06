import { useRouter } from "next/router"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

export default function Layout({ children }) {
  const router = useRouter()

  return (
    <div className="flex">
      <Sidebar currentPath={router.pathname} />
      <div className="flex-1 ml-64">
        <Topbar />
        <main className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen mt-16 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  )
}
