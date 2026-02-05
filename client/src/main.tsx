import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./app/App";
import "./styles/global.scss";
import { AuthProvider } from './context/AuthContext';
import { SlotsProvider } from './context/SlotsContext';
import { MonthProvider } from './context/MonthContext';

import { ErrorProvider } from './context/ErrorContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorProvider>
      <AuthProvider>
        <MonthProvider>
          <SlotsProvider>
            <App />
          </SlotsProvider>
        </MonthProvider>
      </AuthProvider>
    </ErrorProvider>
  </React.StrictMode>,
)
