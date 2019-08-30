import React from 'react';

import Header from './Header';
import Container from './Container';

export default class Layout extends React.Component {
    render() {

      return ( 
        <div>
          { this.props.children }
        </div>
      );
    }
  }