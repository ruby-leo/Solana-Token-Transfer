import { PublicKey, Transaction } from "@solana/web3.js";
import { useEffect, useState } from "react";

//create types
type DisplayEncoding = "utf8" | "hex";
type PhantomEvent = "disconnect" | "connect" | "accountChanged";
type PhantomRequestMethod =
  | "connect"
  | "disconnect"
  | "signTransaction"
  | "signAllTransactions"
  | "signMessage";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}
interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}

const getProvider = (): PhantomProvider | undefined => {
  if ("solana" in window) {
    const provider = window.solana as any;
    if (provider.isPhantom) return provider as PhantomProvider;
  }
};

type Props = {
  handlePhantomConnection: (value: boolean) => void;
  handleReceiverAddr: (value: PublicKey) => void;
}

const ConnectToPhantomWallet = ({ handlePhantomConnection, handleReceiverAddr }: Props) => {
  const [provider, setProvider] = useState<PhantomProvider | undefined>(undefined);
  const [isWalletCreated, setWalletCreated] = useState<boolean>(false);

  useEffect(() => {
    const provider = getProvider();
    if (provider) {
      setProvider(provider);
    }
  }, []);

  const connectToPhantomWallet = async () => {
    console.log("connecting to Phantom Wallet");
    //@ts-ignore
    const { solana } = window;
    if (solana) {
      try {
        const response = await solana.connect();
        handlePhantomConnection(true);
        setWalletCreated(true);
        handleReceiverAddr(response.publicKey.toString());
        console.log("Receiver Wallet Key (Phantom Key) is:", response.publicKey.toString());
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div>
      {!provider
        && <p className="msg">
        No provider found. Install <a className="msg" href="https://phantom.app/">Phantom Browser extension</a></p>}

      {provider
        && !isWalletCreated
        && <button className='btnActive' onClick={connectToPhantomWallet}>Connect Phantom Wallet</button>}

      {provider
        && isWalletCreated
        && <button className='btnNotActive'>Connected to Phantom Wallet</button>}
    </div>
  )
}
export default ConnectToPhantomWallet;