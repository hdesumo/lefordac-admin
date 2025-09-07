import { useState } from "react"
import axios from "axios"

export default function MessagesPage({ messages }) {
  const [form, setForm] = useState({
    destinataire: "",
    contenu: "",
    operateur: "",
  })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`, form)
      setStatus("Message envoyé ✅")
      setForm({ destinataire: "", contenu: "", operateur: "" })
    } catch (err) {
      console.error("Erreur envoi message:", err)
      setStatus("Erreur ❌")
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-lefordac-blue dark:text-lefordac-accent mb-6">
        Gestion des Messages
      </h1>

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-4 max-w-lg mb-8"
      >
        <input
          type="text"
          name="destinataire"
          placeholder="Numéro du destinataire"
          value={form.destinataire}
          onChange={handleChange}
          className="w-full border p-2 rounded dark:bg-gray-900"
          required
        />

        <textarea
          name="contenu"
          placeholder="Contenu du message"
          value={form.contenu}
          onChange={handleChange}
          rows="3"
          className="w-full border p-2 rounded dark:bg-gray-900"
          required
        />

        <input
          type="text"
          name="operateur"
          placeholder="Opérateur (Orange, MTN, etc.)"
          value={form.operateur}
          onChange={handleChange}
          className="w-full border p-2 rounded dark:bg-gray-900"
        />

        <button
          type="submit"
          className="bg-lefordac-blue text-white px-4 py-2 rounded hover:bg-lefordac-secondary"
        >
          Envoyer
        </button>

        {status && <p className="mt-2 text-sm font-medium">{status}</p>}
      </form>

      {/* Liste des messages */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Messages envoyés</h2>
        {messages.length > 0 ? (
          <ul className="space-y-3">
            {messages.map((m) => (
              <li key={m.id} className="border-b pb-2">
                <p>
                  <strong>À :</strong> {m.destinataire} ({m.operateur})
                </p>
                <p className="mt-1">{m.contenu}</p>
                <p className="text-xs text-gray-500">
                  {new Date(m.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Aucun message envoyé.</p>
        )}
      </div>
    </div>
  )
}

/* ======== Récupération des messages côté serveur ======== */
export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`)
    const data = await res.json()
    return {
      props: {
        messages: data || [],
      },
    }
  } catch (error) {
    console.error("Erreur chargement des messages:", error)
    return {
      props: {
        messages: [],
      },
    }
  }
}
