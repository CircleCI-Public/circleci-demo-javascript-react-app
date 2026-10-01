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

  componentDidMount() 
  {
    const mockHippos = 
    [
      { data: { id: '1', crosspost_parent: null, media: null, url: '/hippos/hippo1.png' } },
      { data: { id: '2', crosspost_parent: null, media: null, url: '/hippos/hippo2.png' } },
      { data: { id: '3', crosspost_parent: null, media: null, url: '/hippos/hippo3.png' } },
      { data: { id: '4', crosspost_parent: null, media: null, url: '/hippos/hippo4.png' } },

    ];
    this.setState({ cards: mockHippos });
  }
}

//   componentDidMount() {
//       fetch('https://www.reddit.com/r/babyhippos/hot/.json?count=20')
//       .then(res => res.json())
//       .then((data) => {
//           console.log(data.data.children);
//           this.setState({ cards: data.data.children })
//       })
//       .catch(console.log)
//   }
// }

export default App;
