import React, { useEffect } from 'react';
import WebSocketManager from '../services/websocket';

const App = () => {
  useEffect(() => {
    // Connexion WebSocket lors du montage du composant
    // WebSocketManager.connect('ws://example.com/socket');

    // Exemple d'envoi de message après 5 secondes
    const timeout = setTimeout(() => {
      WebSocketManager.send({ type: 'hello', content: 'World!' });
    }, 5000);

    // Fermer la connexion WebSocket lors du démontage du composant
    return () => {
      WebSocketManager.close();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div>
      {/* Contenu de votre application */}
    </div>
  );
};

export default App;
