'use client'

import React, { useEffect, useMemo } from 'react'
import {
  getReadonlyProvider,
  fetchPollDetails,
  fetchAllCandidates,
} from '../../services/blockchain.service'
import { RootState } from '@/app/utils/interfaces'
import { useParams } from 'next/navigation'
import RegCandidate from '@/app/components/RegCandidate'
import { FaRegEdit } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { globalActions } from '@/app/store/globalSlices'
import { useWallet } from '@solana/wallet-adapter-react'
import CandidateList from '@/app/components/CandidateList'

export default function PollDetails() {
  const { pollId } = useParams()
  const { publicKey } = useWallet()

  const program = useMemo(() => getReadonlyProvider(), [])

  const dispatch = useDispatch()
  const { setRegModal, setCandidates, setPoll } = globalActions
  const { candidates, poll } = useSelector(
    (states: RootState) => states.globalStates
  )

  useEffect(() => {
    if (!program || !pollId) return

    // Fetch poll details
    const fetchDetails = async () => {
      await fetchPollDetails(program, pollId as string)
      await fetchAllCandidates(program, pollId as string)
    }

    fetchDetails()
  }, [program, pollId, setPoll, setCandidates, dispatch])

  if (!poll) {
    return (
      <div className="flex flex-col items-center py-10">
        <h2 className="text-gray-700 text-lg font-semibold">
          Loading poll details...
        </h2>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col items-center py-10 space-y-6 animate-fadeIn">
        <h2 className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-full px-8 py-3 text-2xl font-extrabold shadow-lg drop-shadow-lg tracking-wide">
          Poll Details
        </h2>

        <div className="bg-white border border-purple-300 rounded-3xl shadow-2xl p-10 w-4/5 md:w-3/5 space-y-8 text-center">
          <h3 className="text-3xl font-extrabold text-purple-900">
            {poll.description}
          </h3>
          <div className="text-base text-purple-700 space-y-4">
            <p>
              <span className="font-semibold">Starts:</span>{' '}
              {new Date(poll.start).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Ends:</span>{' '}
              {new Date(poll.end).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Candidates:</span>{' '}
              {poll.candidates}
            </p>
          </div>
        </div>

        {publicKey ? (
          <button
            className="flex justify-center items-center space-x-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-full
          px-8 py-3 text-lg font-extrabold shadow-lg hover:from-indigo-700 hover:to-pink-700 transition duration-300"
            onClick={() => dispatch(setRegModal('scale-100'))}
          >
            <span>Candidates</span>
            <FaRegEdit />
          </button>
        ) : (
          <button
            className="flex justify-center items-center space-x-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-full
            px-8 py-3 text-lg font-extrabold shadow-lg"
          >
            <span>Candidates</span>
          </button>
        )}

        {candidates.length > 0 ? (
          <CandidateList
            candidates={candidates}
            pollAddress={poll.publicKey}
            pollId={poll.id}
          />
        ) : (
          <p className="text-purple-700 italic mt-6">No candidates registered yet.</p>
        )}
      </div>

      {pollId && <RegCandidate pollId={poll.id} pollAddress={poll.publicKey} />}
    </>
  )
}
