import React, { useState, useEffect, useCallback } from 'react';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import NFTForm from './NFTForm';
import NFTList from './NFTList';

const getConnectionInstance = (() => {
  let instance = null;
  return () => {
    if (!instance) {
      const solNetwork = process.env.REACT_APP_SOLANA_NETWORK || 'devnet';
      instance = new Connection(clusterApiUrl(solNetwork), 'confirmed');
    }
    return instance;
  };
})();

const MainComponent = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [nftCollection, setNftCollection] = useState([]);

  useEffect(() => {
    const solanaConnection = getConnectionInstance();
    console.log(`Connected to ${solanaConnection.rpcEndpoint}`);
    setWalletAddress('YOUR_SOLANA_ADDRESS_HERE');
  }, []);

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