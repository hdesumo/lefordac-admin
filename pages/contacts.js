import { useState } from "react"
import axios from "axios"

export default function ContactsPage({ contacts }) {
  const [form, setForm] = useState({
    nom: "",
    telephone: "",
    region: "",
  })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts`, form)
      setStatus("Contact ajouté ✅")
      setForm({ nom: "", telephone: "", region: "" })
    } catch (err) {
      console.error("Erreur ajout contact:", err)
      setStatus("Erreur ❌")
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestion des Contacts</h1>

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
        <input
          type="text"
          name="region"
          placeholder="Région"
          value={form.region}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button type="submit" className="bg-lefordac-blue text-white px-4 py-2 rounded">
          Enregistrer
        </button>

        {status && <p>{status}</p>}
      </form>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Liste des Contacts</h2>
        {contacts.length > 0 ? (
          <ul className="space-y-2">
            {contacts.map((c) => (
              <li key={c.id} className="border-b pb-2">
                <strong>{c.nom}</strong> — {c.telephone} ({c.region})
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun contact disponible.</p>
        )}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts`)
    const data = await res.json()
    return { props: { contacts: data || [] } }
  } catch (error) {
    console.error("Erreur chargement contacts:", error)
    return { props: { contacts: [] } }
  }
}
