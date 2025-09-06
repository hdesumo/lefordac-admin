export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Carte 1 */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-bold text-lefordac-blue dark:text-lefordac-accent">Utilisateurs</h2>
        <p className="text-3xl font-bold mt-2">1,245</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">+12% ce mois</p>
      </div>

      {/* Carte 2 */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-bold text-lefordac-blue dark:text-lefordac-accent">Contacts</h2>
        <p className="text-3xl font-bold mt-2">532</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">+8% ce mois</p>
      </div>

      {/* Carte 3 */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-bold text-lefordac-blue dark:text-lefordac-accent">Galerie</h2>
        <p className="text-3xl font-bold mt-2">87</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Nouvelles photos</p>
      </div>

      {/* Carte 4 */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-bold text-lefordac-blue dark:text-lefordac-accent">Statistiques</h2>
        <p className="text-3xl font-bold mt-2">98%</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Disponibilité</p>
      </div>
    </div>
  )
}
