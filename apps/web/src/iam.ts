// Canonical Zoo ID auth (HIP-0111) via @hanzo/iam SPA PKCE.
// One source of truth for the IAM config used by <IamProvider>.
// serverUrl defaults to the Zoo brand IAM host; override with VITE_IAM_URL
// (e.g. https://id.zoo.network until zoo.id DNS/ingress is provisioned).
import type { IAMConfig } from '@hanzo/iam/browser'

export const iamConfig: IAMConfig = {
  serverUrl: import.meta.env.VITE_IAM_URL ?? 'https://zoo.id',
  clientId: import.meta.env.VITE_IAM_CLIENT_ID ?? 'zoo-cloud',
  redirectUri: `${window.location.origin}/auth/callback`,
  scope: 'openid profile email',
}
