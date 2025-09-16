import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ImageUtils } from './utils/imageUtils'

// Make ImageUtils available globally for testing
declare global {
  interface Window {
    ImageUtils: typeof ImageUtils;
  }
}
window.ImageUtils = ImageUtils;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
