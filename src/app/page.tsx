'use client'

import React, { useEffect, useMemo, useState } from 'react'
import {
  fetchAllPolls,
  getCounter,
  getProvider,
  getReadonlyProvider,
  initialize,
} from '../app/services/blockchain.service'
import Link from 'next/link'
import { Poll } from './utils/interfaces'
import { BN } from '@coral-xyz/anchor'
import { useWallet } from '@solana/wallet-adapter-react'
import { toast } from 'react-toastify'

export default function Page() {
  const [polls, setPolls] = useState<Poll[]>([])
  const { publicKey, signTransaction, sendTransaction } = useWallet()
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const programReadOnly = useMemo(() => getReadonlyProvider(), [])

  const program = useMemo(
    () => getProvider(publicKey, signTransaction, sendTransaction),
    [publicKey, signTransaction, sendTransaction]
  )

  const fetchData = async () => {
    fetchAllPolls(programReadOnly).then((data) => setPolls(data as any))
    const count = await getCounter(programReadOnly)
    const initialized = count.gte(new BN(0))
    setIsInitialized(initialized)
    return initialized
  }

  useEffect(() => {
    if (!programReadOnly) return
    fetchData().then((initialized) => {
      if (!initialized && publicKey && program) {
        handleInit()
      }
    })
  }, [programReadOnly, publicKey, program])

  const handleInit = async () => {
    if (!program || !publicKey) return

    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        try {
          const tx = await initialize(program, publicKey)
          console.log(tx)

          await fetchData()
          resolve(tx as any)
        } catch (error) {
          console.error('Transaction failed:', error)
          reject(error)
        }
      }),
      {
        pending: 'Initializing Program...',
        success: 'Initialization successful 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <div className="flex flex-col items-center py-10 animate-fadeIn">
      <div className="text-center mb-10">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4 animate-pulse">
          Welcome to VotingDapp!
        </h1>
        <p className="text-xl text-red-700 mb-6 max-w-3xl mx-auto leading-relaxed">
          🌟 Experience the future of voting with decentralized polls on the Solana blockchain. Create, participate, and vote securely with your wallet!
        </p>
      </div>
      {(isInitialized || polls.length > 0) && (
        <h2 className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-8 py-3 text-2xl font-extrabold mb-10 shadow-lg drop-shadow-lg animate-slideIn">
          List of Polls
        </h2>
      )}

      {!isInitialized && !publicKey && polls.length < 1 && (
        <p className="text-white text-lg font-semibold bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4 shadow-lg">
          We don't have any polls yet, please connect your wallet.
        </p>
      )}

      {isInitialized && polls.length < 1 && (
        <p className="text-white text-lg font-semibold bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4 shadow-lg">
          We don't have any polls yet, be the first to create one!
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-4/5">
        {polls.map((poll, index) => (
          <div
            key={poll.publicKey}
            className="bg-white/90 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl p-8 space-y-6 hover:scale-105 hover:shadow-3xl transition-all duration-200 animate-fadeIn"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h3 className="text-xl font-extrabold text-purple-900 drop-shadow-sm">
              {poll.description.length > 25
                ? poll.description.slice(0, 25) + '...'
                : poll.description}
            </h3>
            <div className="text-sm text-purple-700 space-y-3">
              <p className="flex items-center space-x-2">
                <span className="font-bold text-purple-800">Starts:</span>
                <span>{new Date(poll.start).toLocaleString()}</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="font-bold text-purple-800">Ends:</span>
                <span>{new Date(poll.end).toLocaleString()}</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="font-bold text-purple-800">Candidates:</span>
                <span>{poll.candidates}</span>
              </p>
            </div>

            <div className="w-full">
              <Link
                href={`/polls/${poll.publicKey}`}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-extrabold py-3 px-6 rounded-full shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 w-full block text-center hover:scale-105"
              >
                View Poll
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
