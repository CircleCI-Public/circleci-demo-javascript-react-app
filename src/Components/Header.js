import React, { useState } from 'react';

const Header = ({ title }) => {
  const [showAbout, setShowAbout] = useState(false);

  const toggleAbout = (e) => {
    e.preventDefault();
    setShowAbout((prev) => !prev);
  };

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a className="navbar-brand" href="/#">{ title }</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/#" onClick={toggleAbout}>
                About <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {showAbout && (
        <div style={{ marginTop: '70px', padding: '16px', background: '#f8f9fa' }}>
          <p>
            Baby Hippo Gram is a small demo app used to show how CircleCI Chunk sidecars
            catch AI-generated code mistakes in the inner loop before they ever reach CI.
            <br /> 
            Click on the baby hippo image to like them!
           
          </p>
        </div>
      )}
    </>
  );
};

export default Header;