import { useSolana } from '@/components/solana/use-solana'
import { WalletDropdown } from '@/components/wallet-dropdown'
import { AppHero } from '@/components/app-hero'
import { VotingdappUiProgramExplorerLink } from './ui/votingdapp-ui-program-explorer-link'
import { VotingdappUiCreate } from './ui/votingdapp-ui-create'
import { VotingdappUiProgram } from '@/features/votingdapp/ui/votingdapp-ui-program'

export default function VotingdappFeature() {
  const { account } = useSolana()

  if (!account) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="hero py-[64px]">
          <div className="hero-content text-center">
            <WalletDropdown />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <AppHero title="Votingdapp" subtitle={'Run the program by clicking the "Run program" button.'}>
        <p className="mb-6">
          <VotingdappUiProgramExplorerLink />
        </p>
        <VotingdappUiCreate />
      </AppHero>
      <VotingdappUiProgram />
    </div>
  )
}
