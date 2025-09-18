import React, { useMemo, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { globalActions } from '../store/globalSlices'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../utils/interfaces'
import {
  fetchAllCandidates,
  fetchPollDetails,
  getProvider,
  registerCandidate,
} from '../services/blockchain.service'
import { useWallet } from '@solana/wallet-adapter-react'
import { toast } from 'react-toastify'

const RegCandidate = ({
  pollId,
  pollAddress,
}: {
  pollId: number
  pollAddress: string
}) => {
  const { publicKey, sendTransaction, signTransaction } = useWallet()
  const [candidateName, setCandidateName] = useState<string>('')

  const dispatch = useDispatch()
  const { setRegModal } = globalActions
  const { regModal } = useSelector((states: RootState) => states.globalStates)

  const program = useMemo(
    () => getProvider(publicKey, signTransaction, sendTransaction),
    [publicKey, signTransaction, sendTransaction]
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!program || !publicKey || !candidateName) return

    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        try {
          const tx = await registerCandidate(
            program!,
            publicKey!,
            pollId,
            candidateName
          )

          setCandidateName('')
          dispatch(setRegModal('scale-0'))

          await fetchPollDetails(program, pollAddress)
          await fetchAllCandidates(program, pollAddress)

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
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
      bg-black bg-opacity-50 transform z-[3000] transition-transform duration-300 ${regModal}`}
    >
      <div className="bg-white shadow-2xl rounded-3xl w-11/12 md:w-2/5 h-7/12 p-8">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between items-center">
            <p className="block text-lg font-extrabold text-gray-900">
              Candidate Name
            </p>
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none"
              onClick={() => dispatch(setRegModal('scale-0'))}
            >
              <FaTimes className="text-gray-400 hover:text-gray-600 transition duration-200" />
            </button>
          </div>

          <div>
            <input
              type="text"
              id="description"
              placeholder="Enter candidate name..."
              required
              className="mt-1 block w-full py-4 px-5 border border-gray-300 rounded-2xl shadow-md focus:ring-4 focus:ring-pink-400 focus:outline-none transition duration-300 bg-gray-50 text-gray-900 placeholder-gray-400"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
            />
          </div>

          <div className="flex justify-center w-full">
            <button
              type="submit"
              disabled={!program || !publicKey}
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-extrabold py-3 px-8 rounded-full shadow-lg hover:from-pink-600 hover:to-red-600 transition duration-300 w-full disabled:opacity-60"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegCandidate
