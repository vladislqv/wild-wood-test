import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

import './i18n.ts';
import Menu from './components/menu.tsx';
import RootLayout from './components/root-layout.tsx';
import Orders from './components/orders.tsx';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        index: true,
        element: <Menu />,
      },
      {
        path: '/orders',
        element: <Orders />,
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
