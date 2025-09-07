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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/news`, form)
      setStatus("News ajoutée avec succès ✅")
      setForm({ titre: "", sousTitre: "", contenu: "", type: "article" })
    } catch (err) {
      console.error("Erreur ajout news:", err)
      setStatus("Erreur lors de l’ajout ❌")
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-lefordac-blue dark:text-lefordac-accent mb-6">
        Gestion des News
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
          Enregistrer
        </button>

        {status && <p className="mt-2 text-sm font-medium">{status}</p>}
      </form>

      {/* Liste des news */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Liste des News</h2>
        {news.length > 0 ? (
          <ul className="space-y-3">
            {news.map((n) => (
              <li key={n.id} className="border-b pb-2">
                <h3 className="font-bold">{n.titre}</h3>
                <p className="text-sm text-gray-600">{n.sousTitre}</p>
                <p className="mt-1">{n.contenu}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Aucune news disponible.</p>
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
    console.error("Erreur chargement des news:", error)
    return {
      props: {
        news: [],
      },
    }
  }
}
