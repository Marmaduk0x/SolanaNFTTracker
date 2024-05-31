import React, { useState } from 'react';

const trackCollectionAndWallets = (collectionAddress, walletAddresses) => {
  console.log(`Tracking collection: ${collectionAddress} for wallets:`, walletAddresses);
};

const NFTTrackingForm = () => {
  const [collectionAddress, setCollectionAddress] = useState('');
  const [walletAddresses, setWalletAddresses] = useState([]);
  const [walletAddressInput, setWalletAddressInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!collectionAddress || walletAddresses.length === 0) {
      alert('Please fill in both the collection address and at least one wallet address.');
      return;
    }
    trackCollectionAndWallets(collectionAddress, walletAddresses);
    setCollectionAddress('');
    setWalletAddresses([]);
    setWalletAddressInput('');
  };

  const handleAddWalletAddress = () => {
    if (walletAddressInput && !walletAddresses.includes(walletAddressInput)) {
      setWalletAddresses([...walletAddresses, walletAddressInput]);
      setWalletAddressInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Collection Address:</label>
        <input 
          type="text" 
          value={collectionAddress}
          onChange={(e) => setCollectionAddress(e.target.value)}
          placeholder="Enter collection address"
        />
      </div>
      <div>
        <label>Wallet Address:</label>
        <input
          type="text"
          value={walletAddressInput}
          onChange={(e) => setWalletAddressInput(e.target.value)}
          placeholder="Enter wallet address"
        />
        <button type="button" onClick={handleAddWalletAddress}>Add to list</button>
      </div>
      {walletAddresses.length > 0 &&
        <div>
          <h4>Wallet Addresses to track:</h4>
          <ul>
            {walletAddresses.map((address, index) => (
              <li key={index}>{address}</li>
            ))}
          </ul>
        </div>
      }
      <button type="submit">Track Collection & Wallets</button>
    </form>
  );
};

export default NFTTrackingForm;