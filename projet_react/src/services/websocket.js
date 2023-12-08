const WebSocketManager = (function () {
    let socket;
  
    function connect(url) {
      socket = new WebSocket(url);
  
      socket.onopen = () => {
        console.log('WebSocket connection established.');
      };
  
      socket.onmessage = (event) => {
        console.log('WebSocket message received:', event.data);
        // Gérer les messages reçus et mettre à jour l'état de votre application
      };
  
      socket.onclose = (event) => {
        console.log('WebSocket connection closed:', event.reason);
      };
  
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  
    function send(message) {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
      } else {
        console.error('WebSocket is not open. Unable to send message.');
      }
    }
  
    function close() {
      if (socket) {
        socket.close();
      }
    }
  
    return {
      connect,
      send,
      close,
    };
  })();
  
  export default WebSocketManager;
  