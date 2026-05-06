import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App, { routes } from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.tsx'
import { RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <RouterProvider router={routes} />
  </StrictMode>,
)
