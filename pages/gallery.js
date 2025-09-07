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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Galerie</h1>

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
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="url"
          name="url"
          placeholder="Lien de l’image"
          value={form.url}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button type="submit" className="bg-lefordac-blue text-white px-4 py-2 rounded">
          Ajouter
        </button>

        {status && <p>{status}</p>}
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.length > 0 ? (
          gallery.map((img) => (
            <div key={img.id} className="border rounded overflow-hidden">
              <img src={img.url} alt={img.titre} className="w-full h-40 object-cover" />
              <p className="p-2 text-sm">{img.titre}</p>
            </div>
          ))
        ) : (
          <p>Aucune image disponible.</p>
        )}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery`)
    const data = await res.json()
    return { props: { gallery: data || [] } }
  } catch (error) {
    console.error("Erreur chargement galerie:", error)
    return { props: { gallery: [] } }
  }
}
