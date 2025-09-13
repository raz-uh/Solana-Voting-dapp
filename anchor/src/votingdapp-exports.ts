// Here we export some useful types and functions for interacting with the Anchor program.
import { address } from 'gill'
import { SolanaClusterId } from '@wallet-ui/react'
import { VOTINGDAPP_PROGRAM_ADDRESS } from './client/js'
import VotingdappIDL from '../target/idl/votingdapp.json'

// Re-export the generated IDL and type
export { VotingdappIDL }

// This is a helper function to get the program ID for the Votingdapp program depending on the cluster.
export function getVotingdappProgramId(cluster: SolanaClusterId) {
  switch (cluster) {
    case 'solana:devnet':
    case 'solana:testnet':
      // This is the program ID for the Votingdapp program on devnet and testnet.
      return address('6z68wfurCMYkZG51s1Et9BJEd9nJGUusjHXNt4dGbNNF')
    case 'solana:mainnet':
    default:
      return VOTINGDAPP_PROGRAM_ADDRESS
  }
}

export * from './client/js'
