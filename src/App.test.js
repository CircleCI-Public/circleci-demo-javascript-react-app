import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import the React Test Renderer
import { create } from "react-test-renderer";
// test card state renders

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
