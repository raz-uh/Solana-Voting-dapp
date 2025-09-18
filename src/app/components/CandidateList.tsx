import React, { useEffect, useMemo, useState } from 'react'
import { Candidate } from '../utils/interfaces'
import { useWallet } from '@solana/wallet-adapter-react'
import {
  fetchAllCandidates,
  getProvider,
  hasUserVoted,
  vote,
} from '../services/blockchain.service'
import { toast } from 'react-toastify'

interface Props {
  candidates: Candidate[]
  pollAddress: string
  pollId: number
}

const CandidateList = ({ candidates, pollAddress, pollId }: Props) => {
  const [voted, setVoted] = useState<boolean>(false)
  const { publicKey, sendTransaction, signTransaction } = useWallet()
  const program = useMemo(
    () => getProvider(publicKey, signTransaction, sendTransaction),
    [publicKey, signTransaction, sendTransaction]
  )
  const fetchVotingStatus = async () => {
    const status = await hasUserVoted(program!, publicKey!, pollId)
    setVoted(status)
  }

  useEffect(() => {
    if (!program || !publicKey) return

    fetchVotingStatus()
  }, [program, publicKey, candidates])

  const handleVote = async (candidate: Candidate) => {
    if (!program || !publicKey || voted) return

    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        try {
          const tx = await vote(
            program!,
            publicKey!,
            candidate.pollId,
            candidate.cid
          )

          await fetchAllCandidates(program, pollAddress)
          await fetchVotingStatus()

          console.log(tx)
          resolve(tx as any)
        } catch (error) {
          console.error('Transaction failed:', error)
          reject(error)
        }
      }),
      {
        pending: 'Approve transaction...',
        success: 'Transaction successful 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <div className="bg-white/90 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl p-8 w-4/5 md:w-3/5 space-y-6 text-center animate-fadeIn">
      <div className="space-y-6">
        {candidates.map((candidate, index) => (
          <div
            key={candidate.publicKey}
            className="flex justify-between items-center border-b border-white/30 last:border-none pb-4 last:pb-0"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="text-purple-900 font-extrabold text-lg drop-shadow-sm">{candidate.name}</span>
            <span className="text-purple-700 text-sm flex items-center space-x-3">
              <button
                onClick={() => handleVote(candidate)}
                className={`px-4 py-2 bg-${
                  voted ? 'red' : 'green'
                }-100 text-${voted ? 'red' : 'green'}-700 ${
                  !voted && 'hover:bg-green-200'
                } rounded-full font-extrabold shadow-lg transition duration-300`}
                disabled={voted || !publicKey}
              >
                {voted ? 'Voted' : 'Vote'}{' '}
                <span className="font-bold">{candidate.votes}</span>
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CandidateList
