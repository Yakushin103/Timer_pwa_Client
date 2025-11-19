import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

import { Provider as StorageProvider } from "react-redux"

import { persistStore } from 'redux-persist'
import { PersistGate } from "redux-persist/integration/react"

import App from './App'

import { store } from "./store/store"

import './styles/index.scss'

let persistor = persistStore(store);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StorageProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </StorageProvider>
  </StrictMode>,
)
