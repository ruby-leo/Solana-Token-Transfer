import { useEffect, useState } from 'react';
import './App.css';
import {
  Connection,
  Keypair,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import TransferToPhantomWallet from './components/TransferToPhantomWallet';
import CreateSolAccount from './components/CreateSolAccount';
import Drop2Sols from './components/Drop2Sols';
import ConnectToPhantomWallet from './components/ConnectToPhantomWallet';

function App() {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const [isPhantomConnected, setPhantomConnected] = useState(false);
  const [airdropDone, setAirdropDone] = useState<boolean>(false);
  const [sender, setSender] = useState<Keypair>();
  const [walletAddr, setWalletAddr] = useState<PublicKey>();

  const handleSenderAddr = (value: Keypair) => {
    setSender(value);
  }
  const handleReceiverAddr = (value: PublicKey) => {
    setWalletAddr(value);
  }
  const handlePhantomConnection = (value: boolean) => {
    setPhantomConnected(value);
  }
  const handleAirdrop = (value: boolean) => {
    setAirdropDone(value);
  }
  return (
    <div className="App">
      <header className="App-header">
        <CreateSolAccount 
        sender={sender} handleSenderAddr={handleSenderAddr} />

        {sender && 
        <Drop2Sols 
        airdropDone={airdropDone}
        handleAirdrop={handleAirdrop}
        connection={connection} 
        sender={sender} />}

        <ConnectToPhantomWallet 
        handlePhantomConnection={handlePhantomConnection} 
        handleReceiverAddr={handleReceiverAddr} />

        {isPhantomConnected && 
        <TransferToPhantomWallet 
        airdropDone = {airdropDone}
        connection={connection} 
        isPhantomConnected={isPhantomConnected} 
        sender={sender} 
        walletAddr={walletAddr} />}
      </header>
    </div>
  );
}

export default App;