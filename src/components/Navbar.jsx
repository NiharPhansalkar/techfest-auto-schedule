import React from 'react';
import { HashLink } from 'react-router-hash-link';
import '../styles/navStyles.css';

function Navbar() {
  return (
    <nav className="container">
      <img src="" alt="Logo" />
      <main>
        <HashLink to="/#home">Home</HashLink>
        <HashLink to="/#about">About</HashLink>
      </main>
    </nav>
  );
}

export default Navbar;
