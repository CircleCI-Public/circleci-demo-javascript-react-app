import React, { useState, useEffect } from 'react';
import './App.css';

import Layout from './Components/Layout';
import Header from './Components/Header';
import Container from './Components/Container';
import Card from './Components/Card';

export const App = () => {
  const [cards, setCards] = useState([])

  useEffect( function() {
   return fetch('https://www.reddit.com/r/babyhippos/hot/.json?count=20')
      .then(res => setCards(res.json()))
  }, [])

  return (
    <Layout>
      <Header title="Baby Hippo Gram"/>
      <Container>
        <Card cards={ cards } />
      </Container>
    </Layout>
  );
}
