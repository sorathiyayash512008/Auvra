import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-[#F3F0E9] flex items-center justify-center px-6">
          <div className="max-w-md border border-[#D8D3C8] p-10">
            <p className="font-display text-2xl font-semibold mb-3">Something went wrong.</p>
            <p className="text-sm text-[#6B6A66]">Please refresh the page to continue.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
