export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-lefordac-blue dark:text-lefordac-accent">
        <p>© {new Date().getFullYear()} Lefordac Admin. Tous droits réservés.</p>
      </div>
    </footer>
  )
}
