import React, { useState } from 'react';

const trackCollectionAndWallets = (collectionAddress, walletAddresses) => {
  console.log(`Tracking collection: ${collectionAddress} for wallets:`, walletAddresses);
};

const WalletAddressesInput = ({ onAdd }) => {
  const [walletAddressInput, setWalletAddressInput] = useState('');

  const handleAddClick = () => {
    onAdd(walletAddressInput);
    setWalletAddressInput(''); // Clear input after adding
  };

  return (
    <div>
      <label>Wallet Address:</label>
      <input
        type="text"
        value={walletAddressInput}
        onChange={(e) => setWalletAddressInput(e.target.value)}
        placeholder="Enter wallet address"
      />
      <button type="button" onClick={handleAddClick}>Add to list</button>
    </div>
  );
};

const WalletAddressesList = ({ addresses }) => (
  <div>
    <h4>Wallet Addresses to track:</h4>
    <ul>
      {addresses.map((address, index) => (
        <li key={index}>{address}</li>
      ))}
    </ul>
  </div>
);

const NFTTrackingForm = () => {
  const [collectionAddress, setCollectionAddress] = useState('');
  const [walletAddresses, setWalletAddresses] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!collectionAddress || walletAddresses.length === 0) {
      alert('Please fill in both the collection address and at least one wallet address.');
      return;
    }
    trackCollectionAndWallets(collectionAddress, walletAddresses);
    setCollectionAddress('');
    setWalletAddresses([]);
  };

  const handleAddWalletAddress = (walletAddress) => {
    if (walletAddress && !walletAddresses.includes(walletAddress)) {
      setWalletAddresses([...walletAddresses, walletAddress]);
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
      <WalletAddressesInput onAdd={handleAddWalletAddress} />
      {walletAddresses.length > 0 && <WalletAddressesList addresses={walletAddresses} />}
      <button type="submit">Track Collection & Wallets</button>
    </form>
  );
};

export default NFTTrackingForm;