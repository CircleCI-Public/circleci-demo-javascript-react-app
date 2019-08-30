import React from 'react';
import './App.css';

import Layout from './Componets/Layout';
import Header from './Componets/Header';
import Container from './Componets/Container';


function App() {
  return (
    <Layout>
      <Header />
      <Container>
        Test Content
      </Container>
    </Layout>
  );
}

export default App;
