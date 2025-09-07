import { useState } from "react"
import axios from "axios"

export default function MembersPage({ members }) {
  const [form, setForm] = useState({ nom: "", telephone: "" })
  const [status, setStatus] = useState(null)
  const [editingId, setEditingId] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/members/${editingId}`,
          form
        )
        setStatus("Membre mis à jour ✅")
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/members`, form)
        setStatus("Membre ajouté ✅")
      }
      setForm({ nom: "", telephone: "" })
      setEditingId(null)
    } catch (err) {
      console.error("Erreur membre:", err)
      setStatus("Erreur ❌")
    }
  }

  const handleEdit = (m) => {
    setForm({ nom: m.nom, telephone: m.telephone })
    setEditingId(m.id)
  }

  const handleDelete = async (id) => {
    if (!confirm("Supprimer ce membre ?")) return
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/members/${id}`)
      setStatus("Membre supprimé ✅")
    } catch (err) {
      console.error("Erreur suppression membre:", err)
      setStatus("Erreur ❌")
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-lefordac-blue dark:text-lefordac-accent mb-6">
        Gestion des Membres
      </h1>

      {/* Formulaire */}
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
          className="w-full border p-2 rounded dark:bg-gray-900"
          required
        />

        <input
          type="tel"
          name="telephone"
          placeholder="Téléphone"
          value={form.telephone}
          onChange={handleChange}
          className="w-full border p-2 rounded dark:bg-gray-900"
          required
        />

        <button
          type="submit"
          className="bg-lefordac-blue text-white px-4 py-2 rounded hover:bg-lefordac-secondary"
        >
          {editingId ? "Mettre à jour" : "Enregistrer"}
        </button>

        {status && <p className="mt-2 text-sm font-medium">{status}</p>}
      </form>

      {/* Liste des membres */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Liste des Membres</h2>
        {members.length > 0 ? (
          <ul className="space-y-3">
            {members.map((m) => (
              <li
                key={m.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <strong>{m.nom}</strong> — {m.telephone}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(m)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Aucun membre disponible.</p>
        )}
      </div>
    </div>
  )
}

/* ======== Récupération des données côté serveur ======== */
export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/members`)
    const data = await res.json()
    return {
      props: {
        members: data || [],
      },
    }
  } catch (error) {
    console.error("Erreur chargement membres:", error)
    return {
      props: {
        members: [],
      },
    }
  }
}
