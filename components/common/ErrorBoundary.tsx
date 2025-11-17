import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: undefined,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-100">
            <div className="text-center p-8 border border-red-500/30 rounded-lg bg-red-500/10 max-w-md">
                <h1 className="text-2xl font-bold text-red-400">System Malfunction</h1>
                <p className="mt-2 text-gray-300">
                    An unexpected error occurred. Please try refreshing the page.
                </p>
                <details className="mt-4 text-left text-xs text-gray-400 bg-gray-800/50 p-2 rounded">
                    <summary className="cursor-pointer">Error Details</summary>
                    <pre className="mt-2 whitespace-pre-wrap">
                        <code>{this.state.error?.message}</code>
                    </pre>
                </details>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}