// Bootnode client for Zoo Cloud.
//
// Bootnode (~/work/bootnode) is the multi-chain Web3 deployment platform that
// powers node hosting for the Zoo research network. It runs as a white-label
// at `web3.zoo.ngo` with `zoo` brand and provisions:
//   - Validator + RPC nodes for Zoo and Lux research chains
//   - Test nets for DeSci experiments
//   - Snapshots and indexing
//
// All Zoo Cloud node-management features call into the Bootnode HTTP API.

const BOOTNODE_URL =
  process.env.BOOTNODE_URL ?? process.env.NEXT_PUBLIC_BOOTNODE_URL ?? 'https://web3.zoo.ngo'

const BOOTNODE_BRAND = 'zoo'

export type BootnodeChain = {
  id: string
  name: string
  network: 'mainnet' | 'testnet' | 'devnet' | 'research'
  status: 'running' | 'syncing' | 'paused' | 'error'
  rpcUrl: string
  endpoints: { rpc: string; ws?: string; admin?: string }
}

export type BootnodeNode = {
  id: string
  chainId: string
  role: 'validator' | 'rpc' | 'archive' | 'snapshot'
  region: string
  status: 'running' | 'syncing' | 'paused' | 'error'
  uptimeSeconds: number
}

const headers = (token?: string): HeadersInit => {
  const h: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Brand': BOOTNODE_BRAND,
  }
  if (token) h['Authorization'] = `Bearer ${token}`
  return h
}

export async function listChains(token?: string): Promise<BootnodeChain[]> {
  const r = await fetch(`${BOOTNODE_URL}/v1/chains?brand=${BOOTNODE_BRAND}`, {
    headers: headers(token),
    cache: 'no-store',
  })
  if (!r.ok) throw new Error(`bootnode chains: ${r.status}`)
  return r.json()
}

export async function listNodes(chainId: string, token?: string): Promise<BootnodeNode[]> {
  const r = await fetch(
    `${BOOTNODE_URL}/v1/chains/${encodeURIComponent(chainId)}/nodes`,
    { headers: headers(token), cache: 'no-store' },
  )
  if (!r.ok) throw new Error(`bootnode nodes: ${r.status}`)
  return r.json()
}

export const bootnodeUrl = BOOTNODE_URL
