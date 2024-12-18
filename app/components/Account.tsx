"use client";

import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import Image from "next/image";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div className="flex flex-col items-center gap-6">
      {ensAvatar && (
        <Image 
          alt="ENS Avatar" 
          src={ensAvatar} 
          width={64} 
          height={64}
          className="rounded-full"
        />
      )}
      {address && (
        <p className="text-white">
          {ensName ? `${ensName} (${address})` : address}
        </p>
      )}
      <button
        onClick={() => disconnect()}
        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Disconnect
      </button>
    </div>
  );
}
