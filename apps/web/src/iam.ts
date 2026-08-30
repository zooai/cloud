// Canonical Zoo ID auth (HIP-0111) via @hanzo/iam SPA PKCE.
// One source of truth for the IAM config used by <IamProvider>.
//
// zoolabs.id is the Zoo brand IAM host — it resolves, serves the discovery
// document, and is where `zoo-cloud` is registered. The previous default,
// zoo.id, has no DNS record at all, so a build that did not set VITE_IAM_URL
// sent every sign-in to a host that does not exist. id.zoo.network is an alias
// that discovery redirects here anyway; naming the canonical host directly
// leaves one answer to "which issuer".
//
// The redirect is the origin's /auth/callback, registered for zoo.cloud and
// www.zoo.cloud. Serving this app from any other host needs that host's
// callback registered first.
import type { IAMConfig } from '@hanzo/iam/browser'

export const iamConfig: IAMConfig = {
  serverUrl: import.meta.env.VITE_IAM_URL ?? 'https://zoolabs.id',
  clientId: import.meta.env.VITE_IAM_CLIENT_ID ?? 'zoo-cloud',
  redirectUri: `${window.location.origin}/auth/callback`,
  scope: 'openid profile email',
}
