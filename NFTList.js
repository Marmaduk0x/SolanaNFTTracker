import React, { useState, useEffect } from 'react';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

const NFTMovements = () => {
  const [nftMovements, setNftMovements] = useState([]);

  const getNFTMovements = async () => {
    try {
      const network = clusterApiUrl('devnet');
      const connection = new Connection(network, 'confirmed');

      const programId = new PublicKey('Your_NFT_Program_ID_Here');
      const signatures = await connection.getSignaturesForAddress(programId);
      const detailedTransactions = await Promise.all(
        signatures.map(async (signatureInfo) => {
          const transactionDetail = await connection.getTransaction(signatureInfo.signature);
          if (!transactionDetail) {
            return null;
          }
          return {
            nftId: 'SomeLogicToIdentifyNFT',
            sender: transactionDetail.transaction.message.accountKeys[0].toString(),
            recipient: transactionDetail.transaction.message.accountKeys[1].toString(),
            timestamp: new Date(signatureInfo.blockTime * 1000).toLocaleString(),
          };
        }),
      );
      setNftMovements(detailedTransactions.filter(Boolean));
    } catch (error) {
      console.error('Error fetching NFT movements:', error);
    }
  };

  useEffect(() => {
    getNFTMovements();
  }, []);

  return (
    <div>
      <h2>Tracked NFT Movements</h2>
      <ul>
        {nftMovements.map((movement, index) => (
          <li key={index}>
            <p>NFT ID: {movement.nftId}</p>
            <p>Sender: {movement.sender}</p>
            <p>Recipient: {movement.recipient}</p>
            <p>Timestamp: {movement.timestamp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NFTMovements;