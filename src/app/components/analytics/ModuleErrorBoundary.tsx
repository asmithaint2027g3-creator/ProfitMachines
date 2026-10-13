import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  moduleName: string;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ModuleErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: ''
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[Analytics Error: ${this.props.moduleName}]`, error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 rounded-2xl bg-white/90 border border-red-500/30 text-center my-6 shadow-xl">
          <div className="inline-flex p-3 rounded-full bg-red-500/10 text-red-400 mb-4 border border-red-500/20">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold text-white mb-2">
            Unable to load {this.props.moduleName}
          </h4>
          <p className="text-sm text-[#0066FF] max-w-md mx-auto mb-6">
            An isolated render issue occurred with this analytics tab. Other modules remain unaffected.
          </p>
          <button
            onClick={this.handleRetry}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-[#0066FF] text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/20"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Module
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
