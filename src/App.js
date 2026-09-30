import React, { Component } from 'react';
import './App.css';

import Layout from './Components/Layout';
import Header from './Components/Header';
import Container from './Components/Container';
import Card from './Components/Card';
import { buildFactoryStations } from './factory/metrics';

class App extends Component {
  state = {
    cards: buildFactoryStations(),
  };

  render() {
    return (
      <Layout>
        <Header title="Software Factory" />
        <Container>
          <div className="factory-intro mb-4">
            <h2>Fine-tuning your factory settings</h2>
            <p>
              AI-generated code is going into production. That is the point.
              The question is whether you know it is good before it ships.
              These three stations — Accuracy, Efficiency, and Risk — are how
              teams measure a software factory. Chunk sidecars keep the cheap
              checks in the inner loop; CircleCI remains the outer-loop final
              exam.
            </p>
            <p className="text-muted mb-0">
              Workshop tip: one metric helper under <code>src/factory/</code>{' '}
              is intentionally broken. Fix it with a sidecar before you push.
            </p>
          </div>
          <Card cards={this.state.cards} />
        </Container>
      </Layout>
    );
  }
}

export default App;
