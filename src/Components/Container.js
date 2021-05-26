import React from 'react';

export default class Container extends React.Component {
    render() {
      return (
        <div class="container">
          { this.props.children }
        </div>
      );
    }
  }