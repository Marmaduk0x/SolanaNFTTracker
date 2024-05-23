import React, { useState, useEffect } from 'react';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import NFTForm from './NFTForm';
import NFTList from './NFTList';

const MainComponent = () => {
  const [userAddress, setUserAddress] = useState('');
  const [nftData, setNftData] = useState([]);

  useEffect(() => {
    const getConnection = () => {
      const solanaNetwork = process.env.REACT_APP_SOLANA_NETWORK || 'devnet';
      return new Connection(clusterApiUrl(solanaNetwork), 'confirmed');
    }

    const checkWalletConnection = async () => {
      try {
        const connection = getConnection();
        console.log(`Connected to ${connection.rpcEndpoint}`);
        setUserAddress('YOUR_SOLANA_ADDRESS_HERE');
      } catch (error) {
        console.error("Error connecting to Solana network:", error);
      }
    };

    checkWalletConnection();
  }, []);

  const handleNewNFTData = (newData) => {
    setNftData((prevData) => [...prevData, newData]);
  }

  return (
    <div>
      <h1>NFT Tracker Application</h1>
      <p>Your Solana address: {userAddress}</p>
      <NFTForm onNewNFTData={handleNewNFTData} />
      <NFTList nftData={nftData} />
    </div>
  );
};

export default MainComponent;