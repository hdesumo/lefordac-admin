export default function Navbar() {
  return (
    <nav className="bg-lefordac-blue text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-xl font-bold text-lefordac-accent">
            Lefordac Admin
          </div>

          {/* Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="/" className="hover:text-lefordac-accent">Accueil</a>
            <a href="/contacts" className="hover:text-lefordac-accent">Contacts</a>
            <a href="/gallery" className="hover:text-lefordac-accent">Galerie</a>
            <a href="/users" className="hover:text-lefordac-accent">Utilisateurs</a>
          </div>
        </div>
      </div>
    </nav>
  )
}
