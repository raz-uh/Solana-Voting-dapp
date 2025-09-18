'use client'

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaVoteYea } from 'react-icons/fa'

const Header = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <header className="p-6 bg-white/10 backdrop-blur-md border-b border-white/20 mb-8 shadow-lg">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex justify-start items-center space-x-8">
          <Link href="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
            <FaVoteYea className="text-white text-3xl" />
            <h4 className="text-white text-3xl font-extrabold drop-shadow-lg">votingdapp</h4>
          </Link>

          <div className="flex justify-start items-center space-x-2">
            <Link
              href={'/create'}
              className="text-white font-semibold hover:text-pink-200 transition-colors duration-300 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30"
            >
              Create Poll
            </Link>
          </div>
        </div>

        {isMounted && (
          <WalletMultiButton
            style={{
              background: 'linear-gradient(135deg, #ff7eb3 0%, #ff758c 100%)',
              color: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(255, 126, 179, 0.3)',
              transition: 'all 0.3s ease',
            }}
          />
        )}
      </nav>
    </header>
  )
}

export default Header
