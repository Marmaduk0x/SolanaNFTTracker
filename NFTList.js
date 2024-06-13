import React, { useState, useEffect } from 'react';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

const NFTActivityTracker = () => {
  const [nftActivities, setNftActivities] = useState([]);
  const [fetchError, setFetchError] = useState('');

  const fetchNFTActivity = async () => {
    try {
      const network = clusterApiUrl('devnet');
      const connection = new Connection(network, 'confirmed');

      const nftProgramId = new PublicKey('Your_NFT_Program_ID_Here');
      let transactionSignatures = [];
      try {
        transactionSignatures = await connection.getSignaturesForAddress(nftProgramId);
      } catch (error) {
        console.error('Error fetching transaction signatures:', error);
        setFetchError('Failed to fetch transaction signatures for the NFT Program ID.');
        return;
      }

      const maxConcurrentRequests = 20;
      const fetchTransactionDetailsPromises = [];
      for (let i = 0; i < transactionSignatures.length; i += maxConcurrentRequests) {
        let signaturesBatch = transactionSignatures.slice(i, i + maxConcurrentRequests);
        fetchTransactionDetailsPromises.push(
          ...signaturesBatch.map(signatureInfo =>
            connection.getTransaction(signatureInfo.signature).then(transactionDetail => {
              if (!transactionDetail) return null;
              // Assuming logic to determine the NFT ID and correct sender/receiver index based on transaction
              return {
                nftId: 'ExtractNFTIdFromTransactionLogic',
                sender: transactionDetail.transaction.message.accountKeys[0].toString(),
                recipient: transactionDetail.transaction.message.accountKeys[1].toString(),
                timestamp: new Date(signatureInfo.blockTime * 1000).toLocaleString(),
              };
            }).catch(error => {
              console.log(`Error fetching transaction for signature ${signatureInfo.signature}:`, error);
              return null;
            })
          )
        );
      }

      const nftTransactions = await Promise.all(fetchTransactionDetailsPromises);
      setNftActivities(nftTransactions.filter(Boolean));
    } catch (error) {
      console.error('Error fetching NFT activity:', error);
      setFetchError('An unexpected error occurred while fetching NFT activity.');
    }
  };

  useEffect(() => {
    fetchNFTActivity();
  }, []);

  return (
    <div>
      <h2>NFT Activity Tracker</h2>
      {fetchError && <p style={{ color: 'red' }}>Error: {fetchError}</p>}
      <ul>
        {nftActivities.map((activity, index) => (
          <li key={index}>
            <p>NFT ID: {activity.nftId}</p>
            <p>Sender: {activity.sender}</p>
            <p>Recipient: {activity.recipient}</p>
            <p>Timestamp: {activity.timestamp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NFTActivityTracker;