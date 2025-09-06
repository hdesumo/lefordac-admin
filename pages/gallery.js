import { useState, useEffect } from "react"
import axios from "axios"

export default function GalleryAdmin() {
  const [gallery, setGallery] = useState([])
  const [form, setForm] = useState({
    titre: "",
    type: "photo",
    media: null,
    description: "",
  })

  // Récupérer la galerie
  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery`)
      setGallery(res.data)
    } catch (err) {
      console.error("Erreur chargement galerie:", err)
    }
  }

  useEffect(() => {
    fetchGallery()
  }, [])

  // Gestion des inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setForm({ ...form, media: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("titre", form.titre)
    data.append("type", form.type)
    data.append("description", form.description)
    if (form.media) data.append("media", form.media)

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })

    setForm({ titre: "", type: "photo", media: null, description: "" })
    fetchGallery()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-lefordac-blue dark:text-lefordac-accent mb-6">
        Gestion Galerie
      </h1>

      {/* Formulaire d’ajout */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 shadow rounded-lg mb-6 space-y-3 max-w-lg"
        encType="multipart/form-data"
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
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded dark:bg-gray-900"
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border p-2 rounded dark:bg-gray-900"
        >
          <option value="photo">Photo</option>
          <option value="video">Vidéo</option>
        </select>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="w-full border p-2 rounded dark:bg-gray-900"
        />
        <button
          type="submit"
          className="bg-lefordac-blue text-white px-4 py-2 rounded hover:bg-lefordac-secondary"
        >
          Ajouter
        </button>
      </form>

      {/* Liste galerie */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gallery.map((g) => (
          <div key={g.id} className="bg-white dark:bg-gray-800 shadow rounded p-4">
            <h3 className="font-bold">{g.titre}</h3>
            {g.type === "video" ? (
              <video controls className="w-full rounded mt-2">
                <source
                  src={`${process.env.NEXT_PUBLIC_API_URL}${g.mediaUrl}`}
                  type="video/mp4"
                />
              </video>
            ) : (
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${g.mediaUrl}`}
                alt={g.titre}
                className="w-full rounded mt-2"
              />
            )}
            <p className="text-sm mt-2">{g.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
