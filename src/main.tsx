import React from 'react';
import ReactDOM from 'react-dom/client';
import Providers from '@/Providers.tsx';
import Errors from '@/Errors.tsx'
import Router from '@/routes/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Errors>
      <Providers>
        <Router />
      </Providers>
    </Errors>
  </React.StrictMode>,
);
