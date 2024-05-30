import React, { useState, useEffect, useCallback } from 'react';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import NFTForm from './NFTForm';
import NFTList from './NFTList';

const connectionCache = {
  instance: null,
  getLastInstance: function() {
    if (!this.instance) {
      const solNetwork = process.env.REACT_APP_SOLANA_NETWORK || 'devnet';
      this.instance = new Connection(clusterApiUrl(solNetwork), 'confirmed');
    }
    return this.instance;
  }
};

const MainComponent = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [nftCollection, setNftCollection] = useState([]);

  const establishConnection = useCallback(() => {
    return connectionCache.getLastInstance();
  }, []); 

  useEffect(() => {
    const verifyWalletConnection = async () => {
      try {
        const solanaConnection = establishConnection();
        console.log(`Connected to ${solanaConnection.rpcEndpoint}`);
        setWalletAddress('YOUR_SOLANA_ADDRESS_HERE');
      } catch (error) {
        console.error("Error connecting to the Solana network:", error);
      }
    };

    verifyWalletConnection();
  }, [establishConnection]);

  const appendNFTData = useCallback((newNftData) => {
    setNftCollection((currentNftCollection) => [...currentNftCollection, newNftData]);
  }, []); 

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