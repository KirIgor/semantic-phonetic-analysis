import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error });
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Что-то пошло не так</h1>
          <div>{this.state.error.stack}</div>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
