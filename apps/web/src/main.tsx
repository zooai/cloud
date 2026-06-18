import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { IamProvider } from '@hanzo/iam/react'
import { App } from './App'
import { iamConfig } from './iam'
import './styles.css'

const root = document.getElementById('root')
if (!root) throw new Error('root element missing')

createRoot(root).render(
  <StrictMode>
    <IamProvider config={iamConfig}>
      <App />
    </IamProvider>
  </StrictMode>,
)
