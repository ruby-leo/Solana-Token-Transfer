import { Keypair } from "@solana/web3.js";

type Props = {
  sender: Keypair | undefined;
  handleSenderAddr: (senderAddr: Keypair) => void;
}

const CreateSolAccount = ({ sender, handleSenderAddr }: Props) => {
  const createSolAccount = async () => {
    console.log("\ncreating solana account");
    const senderAddr = await Keypair.generate();
    handleSenderAddr(senderAddr);
    console.log("created a sender address with public key: ", senderAddr.publicKey.toString());
  };
  return (
    <div>
      {!sender 
      ? <button className='btnActive' onClick={createSolAccount}>Create a new Solana account</button> 
      : <p className="msg"><span className="msgTitle">Created New Solana Account:</span> {sender.publicKey.toString()}</p>}
    </div>
  )
}
export default CreateSolAccount;