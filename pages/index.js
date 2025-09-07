export default function DashboardPage({ stats }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-lefordac-blue dark:text-lefordac-accent mb-6">
        Tableau de Bord
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Membres</h2>
          <p className="text-3xl font-bold text-lefordac-blue">
            {stats.members}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Actualités</h2>
          <p className="text-3xl font-bold text-lefordac-blue">
            {stats.news}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Messages</h2>
          <p className="text-3xl font-bold text-lefordac-blue">
            {stats.messages}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Images</h2>
          <p className="text-3xl font-bold text-lefordac-blue">
            {stats.gallery}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ======== Récupération des statistiques côté serveur ======== */
export async function getServerSideProps() {
  try {
    const [membersRes, newsRes, messagesRes, galleryRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/members`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery`),
    ])

    const [members, news, messages, gallery] = await Promise.all([
      membersRes.json(),
      newsRes.json(),
      messagesRes.json(),
      galleryRes.json(),
    ])

    return {
      props: {
        stats: {
          members: members?.length || 0,
          news: news?.length || 0,
          messages: messages?.length || 0,
          gallery: gallery?.length || 0,
        },
      },
    }
  } catch (error) {
    console.error("Erreur chargement stats:", error)
    return {
      props: {
        stats: {
          members: 0,
          news: 0,
          messages: 0,
          gallery: 0,
        },
      },
    }
  }
}
