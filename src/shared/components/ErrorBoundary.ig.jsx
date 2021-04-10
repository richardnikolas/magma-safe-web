import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    const { children } = this.props;
    const { errorInfo, error } = this.state;

    if (errorInfo) {
      return (
        <div>
          <h2>Algo deu errado.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && `${error}`}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired
};

export default ErrorBoundary;
