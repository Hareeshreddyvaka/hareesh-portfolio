import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';
import { ThemeProvider } from './hooks/useTheme';
import AppErrorBoundary from './components/ui/AppErrorBoundary';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <HelmetProvider>
      <AppErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AppErrorBoundary>
    </HelmetProvider>
  </StrictMode>,
);
