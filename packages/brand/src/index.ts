export * from './tokens'

export const brand = {
  name: 'Zoo Cloud',
  legalEntity: 'Zoo Labs Foundation',
  mission: 'Decentralized AI and Science — open research coordination',
  domains: {
    app: 'zoo.cloud',
    foundation: 'zoo.ngo',
    network: 'zoo.network',
    docs: 'docs.zoo.cloud',
    id: 'id.zoo.ngo',
    zips: 'zips.zoo.ngo',
  },
  social: {
    github: 'https://github.com/zoo-labs',
    twitter: 'https://x.com/zoo_ngo',
    discord: 'https://discord.gg/zoo',
  },
  copyright: '(c) Zoo Labs Foundation — 501c3 non-profit',
} as const

export type Brand = typeof brand
