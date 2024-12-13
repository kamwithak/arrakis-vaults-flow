import { ConnectWallet } from "./components/ConnectWallet";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="w-full bg-gray-800 border-b border-blue-600 px-6 py-4">
        <h1 className="text-3xl font-bold">Arrakis Vault Application</h1>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <ConnectWallet />
        </div>
      </main>
    </div>
  );
}
