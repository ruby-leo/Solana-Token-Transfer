import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

type Props = {
    connection: any;
    sender: Keypair;
    airdropDone: boolean;
    handleAirdrop: (value: boolean) => void;
}

const Drop2Sols = ({connection, sender, airdropDone, handleAirdrop} : Props) => {
    const requestAirDrop = async() => {
        // Aidrop 2 SOL to Sender wallet
        console.log("\nAirdopping some SOL to sender wallet: ", sender?.publicKey.toString());
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(sender.publicKey),
            2 * LAMPORTS_PER_SOL
        );
        // Latest blockhash (unique identifer of the block) of the cluster
        let latestBlockHash = await connection.getLatestBlockhash();
        await connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: fromAirDropSignature
        });
        console.log("Airdrop completed for the Sender account");
        handleAirdrop(true);
      }

    return(
        <div>
            {!airdropDone 
            ? <button className="btnActive" onClick={requestAirDrop}>Airdrop 2 sols to the above account</button> 
            : <button className="btnNotActive"> Airdrop done</button>}
        </div>
    )
}
export default Drop2Sols;