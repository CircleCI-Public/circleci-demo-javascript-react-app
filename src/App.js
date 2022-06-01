import React, { Component } from 'react';
import './App.css';

import Layout from './Components/Layout';
import Header from './Components/Header';
import Container from './Components/Container';
import Card from './Components/Card';


class App extends Component {
  render() {
    return (
      <Layout>
        <Header title="Baby Hippo Gram"/>
        <Container>
          <Card cards={ this.state.cards } />
        </Container>
      </Layout>
    );
  }

  state = {
      cards: []
  };

  componentDidMount() {
      fetch('https://www.reddit.com/r/babyhippos/hot/.json?count=20')
      .then(res => res.json())
      .then((data) => {
          console.log(data.data.children);
          this.setState({ cards: data.data.children })
      })
      .catch(console.log)
  }
}

export default App;
