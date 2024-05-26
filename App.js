import React, { useState, useEffect } from 'react';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import NFTForm from './NFTForm';
import NFTList from './NFTList';

const MainComponent = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [nftCollection, setNftCollection] = useState([]);

  useEffect(() => {
    const establishConnection = () => {
      const solNetwork = process.env.REACT_APP_SOLANA_NETWORK || 'devnet';
      return new Connection(clusterApiUrl(solNetwork), 'confirmed');
    }

    const verifyWalletConnection = async () => {
      try {
        const solanaConnection = establishConnection();
        console.log(`Connected to ${solanaConnection.rpcEndpoint}`);
        // Reminder: Replace 'YOUR_SOLANA_ADDRESS_HERE' with dynamic fetching logic if needed
        setWalletAddress('YOUR_SOLANA_ADDRESS_HERE');
      } catch (error) {
        console.error("Error connecting to the Solana network:", error);
      }
    };

    verifyWalletConnection();
  }, []);

  const appendNFTData = (newNftData) => {
    setNftCollection((currentNftCollection) => [...currentNftCollection, newNftData]);
  }

  return (
    <div>
      <h1>NFT Tracker Application</h1>
      <p>Your Solana address: {walletAddress}</p>
      <NFTForm onNewNFTData={appendNFTData} />
      <NFTList nftData={nftCollection} />
    </div>
  );
};

export default MainComponent;