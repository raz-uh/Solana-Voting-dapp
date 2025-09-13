import { useVotingdappProgramId } from '@/features/votingdapp/data-access/use-votingdapp-program-id'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { ellipsify } from '@wallet-ui/react'

export function VotingdappUiProgramExplorerLink() {
  const programId = useVotingdappProgramId()

  return <AppExplorerLink address={programId.toString()} label={ellipsify(programId.toString())} />
}
