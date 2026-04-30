import { Component, ErrorInfo, ReactNode } from 'react';

type AppErrorBoundaryProps = {
  children: ReactNode;
};

type AppErrorBoundaryState = {
  hasError: boolean;
};

class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  public state: AppErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App failed to render', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-surface-dark px-6 text-foreground-dark">
          <div className="max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl shadow-primary-500/10 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-300">Something went wrong</p>
            <h1 className="mt-4 text-3xl font-bold text-white">The portfolio could not finish loading.</h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Please refresh the page. If the issue continues, try opening the site in a normal browser window instead of a
              restricted or private mode.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
