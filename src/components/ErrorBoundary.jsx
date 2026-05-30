import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  componentDidCatch(
    error,
    errorInfo
  ) {
    console.error(
      "App Crash:",
      error,
      errorInfo
    );
  }

  render() {
    if (
      this.state.hasError
    ) {
      return (
        <div className="container">
          <div
            className="card"
            style={{
              textAlign:
                "center",

              padding:
                "100px 30px"
            }}
          >
            <h1
              style={{
                fontSize:
                  "48px",

                marginBottom:
                  "20px"
              }}
            >
              Something went wrong
            </h1>

            <p
              style={{
                color:
                  "#64748b",

                marginBottom:
                  "30px"
              }}
            >
              The application
              encountered an
              unexpected error.
            </p>

            <button
              className="primary-btn"
              onClick={() =>
                window.location.reload()
              }
            >
              Reload App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;