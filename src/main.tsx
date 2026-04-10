import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { setupConsoleErrorTracking } from "./utils/consoleError";

setupConsoleErrorTracking();

console.error("Test d'erreur pour vérifier le tracking");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
