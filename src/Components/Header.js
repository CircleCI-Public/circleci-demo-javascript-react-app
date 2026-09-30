import React from 'react';

export default class Header extends React.Component {
    render() {
      return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <a className="navbar-brand" href="/#">{ this.props.title }</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="https://chunk.ai/" target="_blank" rel="noopener noreferrer">
                  Get Chunk
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://circleci.com/blog/chunk-sidecars/" target="_blank" rel="noopener noreferrer">
                  Sidecars
                </a>
              </li>
            </ul>
          </div>
        </nav>
      );
    }
  }