import { useEffect, useState } from "react"
import axios from "axios"

export default function MessagesList() {
  const [messages, setMessages] = useState([])

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`)
      setMessages(res.data)
    } catch (err) {
      console.error("Erreur chargement messages:", err)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-lefordac-blue dark:text-lefordac-accent mb-6">
        Historique des Messages
      </h1>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-lefordac-blue text-white">
            <tr>
              <th className="px-6 py-3 text-left">Destinataires</th>
              <th className="px-6 py-3 text-left">Contenu</th>
              <th className="px-6 py-3 text-left">Opérateur</th>
              <th className="px-6 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr
                key={m.id}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-3">{m.destinataires}</td>
                <td className="px-6 py-3">{m.contenu}</td>
                <td className="px-6 py-3">{m.operateur || "-"}</td>
                <td className="px-6 py-3">
                  {new Date(m.createdAt).toLocaleString("fr-FR")}
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-3 text-center text-gray-500 dark:text-gray-300">
                  Aucun message enregistré.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
