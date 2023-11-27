import '@/styles/index.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import AppRouter from '@/AppRouter';
import IndexPopUps from '@/components/popUps/indexPopUps';
import ReloadPromt from '@/components/ReloadPromt';
import { RootModelContextProvider } from '@/store/RootModel';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <RootModelContextProvider>
    <BrowserRouter>
      <ReloadPromt />
      <AppRouter />
      <IndexPopUps />
    </BrowserRouter>
  </RootModelContextProvider>,
);
