import React, { useState, useEffect, useCallback } from 'react';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import NFTForm from './NFTForm';
import NFTList from './NFTList';

const MainComponent = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [nftCollection, setNftCollection] = useState([]);

  // Here we use useCallback to memoize the connection function 
  // so it doesn't get recreated on every render.
  const establishConnection = useCallback(() => {
    const solNetwork = process.env.REACT_APP_SOLANA_NETWORK || 'devnet';
    return new Connection(clusterApiUrl(solNetwork), 'confirmed');
  }, []); // dependencies array is empty, meaning it never recreates

  useEffect(() => {
    const verifyWalletConnection = async () => {
      try {
        const solanaConnection = establishConnection();
        console.log(`Connected to ${solanaConnection.rpcEndpoint}`);
        // For a real app, you might fetch or subscribe to a wallet address here
        setWalletAddress('YOUR_SOLANA_ADDRESS_HERE');
      } catch (error) {
        console.error("Error connecting to the Solana network:", error);
      }
    };

    verifyWalletConnection();
  }, [establishConnection]); // Make useEffect aware of `establishConnection` dependency

  const appendNFTData = useCallback((newNftData) => {
    setNftCollection((currentNftCollection) => [...currentNftCollection, newNftData]);
  }, []); // No dependencies, so this function is memoized and won't be recreated on re-renders

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