// import './config/styles.css';
import React from 'react';

// import WebSocketProvider from './components/WebSocketProvider';
// import Playlist from './components/Playlist';
// import Player from './components/Player';
// import Home from './Home';
// import Track from './components/Track';
import AppWithLayout from './config/appWithLayout';
import AppRouter from './config/appRouter';

const App = () => {
  return (
    // <WebSocketProvider>
      <div>
        <AppWithLayout />
        {/* <Home /> */}
        {/* <Player /> */}
        {/* <Playlist /> */}
        {/* <Track /> */}
      </div>
    // </WebSocketProvider>
  );
};

export default App;
