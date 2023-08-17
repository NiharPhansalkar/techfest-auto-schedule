import React from 'react';
import QRCode from 'react-qr-code';
import '../styles/homeStyles.css';

function Home({ qrValue }) {
  return (
    <div id="home">
      <QRCode
        style={{ background: 'white', padding: '16px' }}
        value={qrValue}
      />
    </div>
  );
}

export default Home;
