import { useState } from "react"
import axios from "axios"
import { cameroonData } from "../utils/cameroon-data"

export default function MessagesAdmin() {
  const [form, setForm] = useState({
    destinataires: "Tous",
    contenu: "",
    operateur: "orange",
  })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`, form)
      setStatus("Message enregistré avec succès ✅")
      setForm({ destinataires: "Tous", contenu: "", operateur: "orange" })
    } catch (err) {
      console.error("Erreur envoi message:", err)
      setStatus("Erreur lors de l’envoi ❌")
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
        className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-4 max-w-lg"
      >
        {/* Destinataires */}
        <label className="block text-sm font-medium mb-1">Destinataires</label>
        <select
          name="destinataires"
          value={form.destinataires}
          onChange={handleChange}
          className="w-full border p-2 rounded dark:bg-gray-900"
        >
          <option value="Tous">Tous</option>
          {cameroonData.regions.map((r, idx) => (
            <option key={idx} value={r.name}>
              {r.name} ({r.capital})
            </option>
          ))}
        </select>

        {/* Contenu */}
        <label className="block text-sm font-medium mb-1">Contenu</label>
        <textarea
          name="contenu"
          placeholder="Votre message..."
          value={form.contenu}
          onChange={handleChange}
          rows="4"
          className="w-full border p-2 rounded dark:bg-gray-900"
          required
        />

        {/* Opérateur */}
        <label className="block text-sm font-medium mb-1">Opérateur</label>
        <select
          name="operateur"
          value={form.operateur}
          onChange={handleChange}
          className="w-full border p-2 rounded dark:bg-gray-900"
        >
          <option value="orange">Orange</option>
          <option value="mtn">MTN</option>
        </select>

        {/* Bouton */}
        <button
          type="submit"
          className="bg-lefordac-blue text-white px-4 py-2 rounded hover:bg-lefordac-secondary"
        >
          Enregistrer
        </button>

        {/* Status */}
        {status && (
          <p className="mt-2 text-sm font-medium">{status}</p>
        )}
      </form>
    </div>
  )
}
