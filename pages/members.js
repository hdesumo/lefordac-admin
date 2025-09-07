import { useState } from "react"
import axios from "axios"

export default function MembersPage({ members }) {
  const [form, setForm] = useState({
    nom: "",
    telephone: "",
  })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/members`, form)
      setStatus("Membre ajouté ✅")
      setForm({ nom: "", telephone: "" })
    } catch (err) {
      console.error("Erreur ajout membre:", err)
      setStatus("Erreur ❌")
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Membres</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-4 max-w-lg mb-8"
      >
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={form.nom}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="tel"
          name="telephone"
          placeholder="Téléphone"
          value={form.telephone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button type="submit" className="bg-lefordac-blue text-white px-4 py-2 rounded">
          Enregistrer
        </button>

        {status && <p>{status}</p>}
      </form>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Liste des Membres</h2>
        {members.length > 0 ? (
          <ul className="space-y-2">
            {members.map((m) => (
              <li key={m.id} className="border-b pb-2">
                <strong>{m.nom}</strong> — {m.telephone}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun membre disponible.</p>
        )}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/members`)
    const data = await res.json()
    return { props: { members: data || [] } }
  } catch (error) {
    console.error("Erreur chargement membres:", error)
    return { props: { members: [] } }
  }
}
