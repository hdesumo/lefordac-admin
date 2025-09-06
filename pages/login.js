export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white shadow-lg p-6 rounded-lg w-96">
        <h1 className="text-2xl font-bold text-green-700 mb-4">Connexion Admin</h1>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="border p-2 w-full mb-3 rounded"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700">
          Se connecter
        </button>
      </div>
    </div>
  );
}
