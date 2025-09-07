import { useState } from "react"
import axios from "axios"

export default function GalleryPage({ gallery }) {
  const [form, setForm] = useState({
    titre: "",
    url: "",
  })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery`, form)
      setStatus("Image ajoutée ✅")
      setForm({ titre: "", url: "" })
    } catch (err) {
      console.error("Erreur ajout image:", err)
      setStatus("Erreur ❌")
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Supprimer cette image ?")) return
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery/${id}`)
      setStatus("Image supprimée ✅")
    } catch (err) {
      console.error("Erreur suppression image:", err)
      setStatus("Erreur ❌")
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-lefordac-blue dark:text-lefordac-accent mb-6">
        Gestion de la Galerie
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
          type="url"
          name="url"
          placeholder="Lien de l’image"
          value={form.url}
          onChange={handleChange}
          className="w-full border p-2 rounded dark:bg-gray-900"
          required
        />

        <button
          type="submit"
          className="bg-lefordac-blue text-white px-4 py-2 rounded hover:bg-lefordac-secondary"
        >
          Ajouter
        </button>

        {status && <p className="mt-2 text-sm font-medium">{status}</p>}
      </form>

      {/* Liste des images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.length > 0 ? (
          gallery.map((img) => (
            <div
              key={img.id}
              className="border rounded overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={img.url}
                alt={img.titre}
                className="w-full h-40 object-cover"
              />
              <div className="flex justify-between items-center p-2">
                <p className="text-sm">{img.titre}</p>
                <button
                  onClick={() => handleDelete(img.id)}
                  className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Aucune image disponible.</p>
        )}
      </div>
    </div>
  )
}

/* ======== Récupération des données côté serveur ======== */
export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery`)
    const data = await res.json()
    return {
      props: {
        gallery: data || [],
      },
    }
  } catch (error) {
    console.error("Erreur chargement galerie:", error)
    return {
      props: {
        gallery: [],
      },
    }
  }
}
