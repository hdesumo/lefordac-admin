import { useState } from "react"
import axios from "axios"

export default function NewsPage({ news }) {
  const [form, setForm] = useState({
    titre: "",
    sousTitre: "",
    contenu: "",
    type: "article",
  })
  const [status, setStatus] = useState(null)
  const [editingId, setEditingId] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        // Mise à jour
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/news/${editingId}`,
          form
        )
        setStatus("Actualité mise à jour ✅")
      } else {
        // Création
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/news`, form)
        setStatus("Actualité ajoutée ✅")
      }
      setForm({ titre: "", sousTitre: "", contenu: "", type: "article" })
      setEditingId(null)
    } catch (err) {
      console.error("Erreur news:", err)
      setStatus("Erreur ❌")
    }
  }

  const handleEdit = (item) => {
    setForm({
      titre: item.titre,
      sousTitre: item.sousTitre,
      contenu: item.contenu,
      type: item.type,
    })
    setEditingId(item.id)
  }

  const handleDelete = async (id) => {
    if (!confirm("Supprimer cette actualité ?")) return
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${id}`)
      setStatus("Actualité supprimée ✅")
    } catch (err) {
      console.error("Erreur suppression:", err)
      setStatus("Erreur ❌")
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-lefordac-blue dark:text-lefordac-accent mb-6">
        Gestion des Actualités
      </h1>

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-4 max-w-lg mb-8"
      >
        <input
          type="text"
          name="titre"
          placeholder="Titre"
          value={form.titre}
          onChange={handleChange}
          className="w-full border p-2 rounded dark:bg-gray-900"
          required
        />

        <input
          type="text"
          name="sousTitre"
          placeholder="Sous-titre"
          value={form.sousTitre}
          onChange={handleChange}
          className="w-full border p-2 rounded dark:bg-gray-900"
        />

        <textarea
          name="contenu"
          placeholder="Contenu"
          value={form.contenu}
          onChange={handleChange}
          rows="4"
          className="w-full border p-2 rounded dark:bg-gray-900"
          required
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border p-2 rounded dark:bg-gray-900"
        >
          <option value="article">Article</option>
          <option value="communique">Communiqué</option>
        </select>

        <button
          type="submit"
          className="bg-lefordac-blue text-white px-4 py-2 rounded hover:bg-lefordac-secondary"
        >
          {editingId ? "Mettre à jour" : "Enregistrer"}
        </button>

        {status && <p className="mt-2 text-sm font-medium">{status}</p>}
      </form>

      {/* Liste des actualités */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Liste des actualités</h2>
        {news.length > 0 ? (
          <ul className="space-y-4">
            {news.map((n) => (
              <li key={n.id} className="border-b pb-2">
                <h3 className="font-bold">{n.titre}</h3>
                <p className="text-sm text-gray-600">{n.sousTitre}</p>
                <p className="mt-1">{n.contenu}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(n)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(n.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Aucune actualité disponible.</p>
        )}
      </div>
    </div>
  )
}

/* ======== Récupération des données côté serveur ======== */
export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`)
    const data = await res.json()
    return {
      props: {
        news: data || [],
      },
    }
  } catch (error) {
    console.error("Erreur chargement news:", error)
    return {
      props: {
        news: [],
      },
    }
  }
}
