import { useEffect, useState } from "react"
import axios from "axios"

export default function Members() {
  const [members, setMembers] = useState([])

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/members`)
        setMembers(res.data)
      } catch (err) {
        console.error("Erreur chargement membres:", err)
      }
    }
    fetchMembers()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-lefordac-blue dark:text-lefordac-accent mb-6">
        Membres
      </h1>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-lefordac-blue text-white">
            <tr>
              <th className="px-6 py-3 text-left">Nom</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Rôle</th>
              <th className="px-6 py-3 text-left">Statut</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="px-6 py-3">{m.name}</td>
                <td className="px-6 py-3">{m.email}</td>
                <td className="px-6 py-3">{m.role}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      m.status === "active"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {m.status === "active" ? "Actif" : "Inactif"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
