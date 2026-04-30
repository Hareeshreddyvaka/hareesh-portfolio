import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex bg-[#0F1419] text-white min-h-[50vh] items-center justify-center p-6 text-center">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Space Systems Down</h2>
            <p className="text-gray-400 mb-6">A critical anomaly has occurred in the visualization layer.</p>
            <button 
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Reboot Systems
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
