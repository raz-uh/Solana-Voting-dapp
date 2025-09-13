import { useSolana } from '@/components/solana/use-solana'
import { useMemo } from 'react'
import { getVotingdappProgramId } from '@project/anchor'

export function useVotingdappProgramId() {
  const { cluster } = useSolana()

  return useMemo(() => getVotingdappProgramId(cluster.id), [cluster])
}
