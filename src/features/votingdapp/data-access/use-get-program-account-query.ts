import { useSolana } from '@/components/solana/use-solana'
import { useQuery } from '@tanstack/react-query'
import { getVotingdappProgramId } from '@project/anchor'

export function useGetProgramAccountQuery() {
  const { client, cluster } = useSolana()

  return useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => client.rpc.getAccountInfo(getVotingdappProgramId(cluster.id)).send(),
  })
}
