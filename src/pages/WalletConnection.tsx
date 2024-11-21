import React, { useState, useEffect } from "react";
import Loader from "@/components/Loader/Loader";

const WalletConnection = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    setLoading(true);
    if (window.ethereum && typeof window.ethereum.request === "function") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setError(null);
      } catch (err) {
        console.error("Error connecting to MetaMask:", err);
        setError("Failed to connect wallet. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("MetaMask is not installed. Please install it to connect.");
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  const checkWalletConnection = async () => {
    if (window.ethereum && typeof window.ethereum.request === "function") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (err) {
        console.error("Error checking wallet connection:", err);
      }
    }
  };

  useEffect(() => {
    checkWalletConnection();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {account ? (
        <div>
          <button
            onClick={disconnectWallet}
            className="border border-[red] p-2 rounded-full hover:bg-[red] hover:text-[white] mb-4"
          >
            Disconnect
          </button>
          <div>
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </div>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="border border-[green] p-2 rounded-full hover:bg-[green] hover:text-[white] text-white"
        >
          Connect Wallet
        </button>
      )}

      {error && <div className="text-red-500 mt-2">{error}</div>}
      <img src="/logo.svg" className="App-logo block mx-auto mb-4" alt="logo" />
    </div>
  );
};

export default WalletConnection;
