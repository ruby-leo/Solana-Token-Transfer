import { Keypair, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { useState } from "react";
import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

type Props = {
    connection: any;
    sender: Keypair | undefined;
    walletAddr: PublicKey | undefined;
    isPhantomConnected: boolean;
    airdropDone: boolean;
}

function TransferToPhantomWallet({ connection, isPhantomConnected, sender, walletAddr, airdropDone }: Props) {
    const [transferDone, setTransferDone] = useState<boolean>(false);

    const transferToPhantomWallet = async () => {
        console.log("\nTransfering to Phantom Wallet: ", walletAddr);
        console.log("sender is: ", sender);
        console.log("connection is: ", connection);
        console.log("is phantom connected: ", isPhantomConnected);

        // Send money from "sender" wallet and into phantom wallet
        let transaction = new Transaction().add(
            SystemProgram.transfer({
                //@ts-ignore
                fromPubkey: sender.publicKey,
                //@ts-ignore
                toPubkey: walletAddr,
                lamports: 1999995000 // This is 2 SOLs minus the gas fee to transfer it
            })
        );
        // Sign transaction
        let signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            //@ts-ignore
            [sender]
        );
        console.log("Signature is: ", signature);
        setTransferDone(true);
    };
    return (
        <div>
            {isPhantomConnected && !airdropDone && 
                <button 
                className="btnNotActive"
                onClick={transferToPhantomWallet}>
                Transfer to Phantom Wallet
                </button>
            }
            {isPhantomConnected && airdropDone && !transferDone &&
                <button 
                className="btnActive"
                onClick={transferToPhantomWallet}>
                Transfer to Phantom Wallet
                </button>
            }
            {transferDone && <button className="btnNotActive">Transfer done successfully</button>}
        </div>
    )
}
export default TransferToPhantomWallet;