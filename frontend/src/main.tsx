import { Provider } from 'react-redux';
import { store } from './app/store';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import AppRoutes from './routes.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <AppRoutes />
//   </StrictMode>,
// )


// src/index.tsx


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <AppRoutes />
    </StrictMode>
  </Provider>,


);
