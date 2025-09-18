'use client'

import { NextPage } from 'next'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { BN } from '@coral-xyz/anchor'
import {
  createPoll,
  getCounter,
  getProvider,
  initialize,
} from '../services/blockchain.service'
import { useWallet } from '@solana/wallet-adapter-react'

const Page: NextPage = () => {
  const { publicKey, sendTransaction, signTransaction } = useWallet()
  const [nextCount, setNextCount] = useState<BN>(new BN(0))
  const [isInitialized, setIsInitialized] = useState(false)

  const program = useMemo(
    () => getProvider(publicKey, signTransaction, sendTransaction),
    [publicKey, signTransaction, sendTransaction]
  )

  const [formData, setFormData] = useState({
    description: '',
    startDate: '',
    endDate: '',
  })

  useEffect(() => {
    const fetchCounter = async () => {
      if (!program) return
      try {
        const count = await getCounter(program)
        setNextCount(count.add(new BN(1)))
        setIsInitialized(count.gte(new BN(0)))
      } catch (error) {
        console.error('Error fetching counter:', error)
        setIsInitialized(false)
      }
    }

    fetchCounter()
  }, [program, formData])

  const handleInitialize = async () => {
    if (!program) return

    try {
      await toast.promise(
        new Promise<void>(async (resolve, reject) => {
          try {
            const tx = await initialize(program!, publicKey!, 3)
            console.log('Initialization successful:', tx)
            // Refresh the counter state to update isInitialized
            const count = await getCounter(program)
            setNextCount(count.add(new BN(1)))
            setIsInitialized(count.gte(new BN(0)))
            resolve(tx as any)
          } catch (error: any) {
            console.error('Initialization failed:', error)
            reject(error)
          }
        }),
        {
          pending: 'Initializing program...',
          success: 'Program initialized successfully! You can now create a poll.',
          error: 'Initialization failed 🤯',
        }
      )
    } catch (error: any) {
      // Show specific error message after the promise fails
      toast.error(error.message || 'Initialization failed')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!program || !isInitialized) return

    const { description, startDate, endDate } = formData

    const startTimestamp = new Date(startDate).getTime() / 1000
    const endTimestamp = new Date(endDate).getTime() / 1000

    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        try {
          const tx = await createPoll(
            program!,
            publicKey!,
            nextCount,
            description,
            startTimestamp,
            endTimestamp
          )

          setFormData({
            description: '',
            startDate: '',
            endDate: '',
          })

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
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-8 animate-fadeIn">
      <div className="h-20"></div>
      <div className="flex flex-col justify-center items-center space-y-10 w-full max-w-lg bg-white rounded-4xl shadow-2xl p-10 border border-purple-300">
        <h2 className="text-4xl font-extrabold text-purple-900 mb-8 tracking-wide drop-shadow-lg">
          Create Poll
        </h2>

        <form
          className="w-full space-y-6"
          onSubmit={handleSubmit}
          noValidate
        >
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Poll Description
            </label>
            <input
              type="text"
              id="description"
              placeholder="Briefly describe the purpose of this poll..."
              required
              className="mt-1 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-pink-400 focus:outline-none transition duration-300 bg-gray-50 text-gray-900 placeholder-gray-400"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Start Date
            </label>
            <input
              type="datetime-local"
              id="startDate"
              required
              className="mt-1 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-pink-400 focus:outline-none transition duration-300 bg-gray-50 text-gray-900"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              End Date
            </label>
            <input
              type="datetime-local"
              id="endDate"
              required
              className="mt-1 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-pink-400 focus:outline-none transition duration-300 bg-gray-50 text-gray-900"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
            />
          </div>

          <div className="flex justify-center w-full">
            {isInitialized ? (
              <button
                type="submit"
                disabled={!program}
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-extrabold py-3 px-6 rounded-full shadow-lg hover:from-pink-600 hover:to-red-600 transition duration-300 w-full disabled:opacity-60"
              >
                Create Poll
              </button>
            ) : (
              <button
                type="button"
                disabled={!program}
                onClick={handleInitialize}
                className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-extrabold py-3 px-6 rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-800 transition duration-300 w-full disabled:opacity-60"
              >
                Initialize Program
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page
