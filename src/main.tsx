import React from 'react';
import ReactDOM from 'react-dom/client';
import Providers from '@/Providers.tsx';
import Errors from '@/Errors.tsx'
import App from '@/App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Errors>
      <Providers>
        <App />
      </Providers>
    </Errors>
  </React.StrictMode>,
);
