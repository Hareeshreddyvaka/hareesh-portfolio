import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import '@fontsource-variable/inter';
import './styles/typography.css';
import App from './App';
import CursorSystem from './components/CursorSystem';
import './index.css';
import { ThemeProvider } from './hooks/useTheme';
import AppErrorBoundary from './components/ui/AppErrorBoundary';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <HelmetProvider>
      <AppErrorBoundary>
        <ThemeProvider>
          <CursorSystem />
          <App />
        </ThemeProvider>
      </AppErrorBoundary>
    </HelmetProvider>
  </StrictMode>,
);

if (import.meta.env.DEV) {
  const React = await import('react');
  const ReactDOM = await import('react-dom');
  const axe = await import('@axe-core/react');
  axe.default(React.default, ReactDOM.default, 1000);
}
