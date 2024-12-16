"use client";

import { Button } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Connector, useConnect } from "wagmi";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <div className="flex gap-2">
      {connectors.map((connector) => (
        <WalletOption
          key={connector.uid}
          connector={connector}
          onClick={() => connect({ connector })}
        />
      ))}
    </div>
  );
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <Button
      disabled={!ready}
      onClick={onClick}
      size="3"
      className="disabled:bg-gray-700 disabled:hover:bg-gray-700 disabled:text-gray-500 bg-blue-600 hover:bg-blue-500 text-white"
    >
      {connector.name}
    </Button>
  );
}
