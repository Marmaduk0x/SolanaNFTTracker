import React, { useState } from 'react';

const trackNFTCollectionForWallets = (NFTCollectionAddress, walletAddressesList) => {
  console.log(`Tracking NFT collection: ${NFTCollectionAddress} for wallets:`, walletAddressesList);
};

const WalletAddressInputForm = ({ onAddWallet }) => {
  const [inputWalletAddress, setInputWalletAddress] = useState('');

  const handleAddButtonClick = () => {
    onAddWallet(inputWalletAddress);
    setInputWalletAddress(''); // Clear input after adding
  };

  return (
    <div>
      <label>Wallet Address:</label>
      <input
        type="text"
        value={inputWalletAddress}
        onChange={(e) => setInputWalletAddress(e.target.value)}
        placeholder="Enter wallet address"
      />
      <button type="button" onClick={handleAddButtonClick}>Add to list</button>
    </div>
  );
};

const WalletAddressesDisplay = ({ walletList }) => (
  <div>
    <h4>Wallet Addresses to track:</h4>
    <ul>
      {walletList.map((address, index) => (
        <li key={index}>{address}</li>
      ))}
    </ul>
  </div>
);

const NFTTrackingController = () => {
  const [NFTCollectionAddress, setNFTCollectionAddress] = useState('');
  const [trackedWalletAddresses, setTrackedWalletAddresses] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!NFTCollectionAddress || trackedWalletAddresses.length === 0) {
      alert('Please fill in both the NFT collection address and at least one wallet address.');
      return;
    }
    trackNFTCollectionForWallets(NFTCollectionAddress, trackedWalletAddresses);
    setNFTCollectionAddress('');
    setTrackedWalletAddresses([]);
  };

  const addWalletAddressToList = (newWalletAddress) => {
    if (newWalletAddress && !trackedWalletAddresses.includes(newWalletAddress)) {
      setTrackedWalletAddresses([...trackedWalletAddresses, newWalletAddress]);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label>Collection Address:</label>
        <input
          type="text"
          value={NFTCollectionAddress}
          onChange={(e) => setNFTCollectionAddress(e.target.value)}
          placeholder="Enter NFT collection address"
        />
      </div>
      <WalletAddressInputForm onAddWallet={addWalletAddressToList} />
      {trackedWalletAddresses.length > 0 && <WalletAddressesDisplay walletList={trackedWalletAddresses} />}
      <button type="submit">Track NFT Collection & Wallets</button>
    </form>
  );
};

export default NFTTrackingController;