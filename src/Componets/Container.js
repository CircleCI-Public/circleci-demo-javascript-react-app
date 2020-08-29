import React from 'react';

export default class Container extends React.Component {
    render() {
      return (
        <div className="container" data-testid="data-testid">
          { this.props.children }
        </div>
      );
    }
  }
