import { ConnectWallet } from "./components/ConnectWallet";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <ConnectWallet />
    </div>
  );
}
