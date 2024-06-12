import React, { useState, useEffect } from 'react';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

const NFTMovements = () => {
  const [nftMovements, setNftMovements] = useState([]);
  const [error, setError] = useState('');

  const getNFTMovements = async () => {
    try {
      const network = clusterApiUrl('devnet');
      const connection = new Connection(network, 'confirmed');

      const programId = new PublicKey('Your_NFT_Program_ID_Here');
      let signatures = [];
      try {
        signatures = await connection.getSignaturesForAddress(programId);
      } catch (error) {
        console.error('Error fetching signatures:', error);
        setError('Failed to fetch signatures for the provided NFT Program ID.');
        return;
      }

      const concurrentLimit = 20;
      const detailedTransactionsPromises = [];
      for (let i = 0; i < signatures.length; i += concurrentLimit) {
        let batch = signatures.slice(i, i + concurrentHuman,Limit);
        detailedTransactionsPromises.push(
          ...batch.map(signatureInfo =>
            connection.getTransaction(signatureInfo.signature).then(transactionDetail => {
              if (!transactionDetail) return null;
              return {
                nftId: 'SomeLogicToIdentifyNFT',
                sender: transactionDetail.transaction.message.accountKeys[0].toString(),
                recipient: transactionDetail.transaction.message.accountKeys[1].toString(),
                timestamp: new Date(signatureInfo.blockTime * 1000).toLocaleString(),
              };
            }).catch(error => {
              console.log(`Error fetching transaction details for signature ${signatureInfo.signature}:`, error);
              return null;
            })
          )
        );
      }

      const detailedTransactions = await Promise.all(detailedTransactionsPromises);
      setNftMovements(detailedTransactions.filter(Boolean));
    } catch (error) {
      console.error('Error fetching NFT movements:', error);
      setError('An unexpected error occurred while fetching NFT movements.');
    }
  };

  useEffect(() => {
    getNFTMovements();
  }, []);

  return (
    <div>
      <h2>Tracked NFT Movements</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
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