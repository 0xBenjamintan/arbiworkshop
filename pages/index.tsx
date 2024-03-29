import { useAccount, useWriteContract, useReadContract } from "wagmi";
import abi from "../components/abi.json";
import { useState } from "react";
import dynamic from "next/dynamic";

function Home() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();

  const [contactAddress, setContactAddress] = useState("");
  const [aliasName, setAliasName] = useState("");

  const handleContactAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setContactAddress(event.target.value);
  };

  const handleAliasNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAliasName(event.target.value);
  };

  const getContacts = useReadContract({
    abi,
    address: "0x....testaddress",
    functionName: "",
    account: address,
  });
  const contacts = getContacts.data || [];

  return (
    <main className="flex flex-col items-center justify-between p-12">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Arbitrum Workshop
        </p>
        <div className="fixed left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <w3m-button />
        </div>
      </div>
      <div className="my-20">
        {isConnected ? (
          <>
            <div>
              <h1 className="text-lg">
                <span className="font-bold">Connected Wallet:</span> {address}
              </h1>
            </div>
            <div className="flex flex-col gap-2 my-4 items-center justify-center border-b">
              <input
                className="bg-transparent p-4 border rounded-lg w-96"
                placeholder="Enter Contact Address"
                value={contactAddress}
                onChange={handleContactAddressChange}
              />
              <input
                className="bg-transparent p-4 border rounded-lg w-96"
                placeholder="Enter Alias Name"
                value={aliasName}
                onChange={handleAliasNameChange}
              />
              <button
                className=" mt-4 hover:bg-white hover:text-black bg-transparent text-white p-4 border rounded-lg w-48 mb-8"
                onClick={() =>
                  writeContract({
                    abi,
                    address: "0x...test",
                    functionName: "",
                    args: [contactAddress, aliasName],
                  })
                }
              >
                Add Contact
              </button>
            </div>
            <div>
              <h1 className="text-lg flex flex-col items-center mt-10">
                <span className="font-bold">Contacts:</span>
              </h1>

              <div className="flex flex-col gap-2 my-4 items-center justify-center">
                {(contacts as any[]).map((contact: any, index: number) => (
                  <div
                    key={index}
                    className="flex flex-row items-center justify-between w-96"
                  >
                    <span>{contact}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <h1 className="text-lg">
            <span className="font-bold">Please Connect Wallet</span>
          </h1>
        )}
      </div>
    </main>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
