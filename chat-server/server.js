const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const clients = new Map();

wss.on('connection', (ws) => {
  const clientId = Math.random().toString(36).substring(7);
  const clientName = `User-${clientId}`;
  
  clients.set(ws, {
    id: clientId,
    name: clientName
  });

  const participants = Array.from(clients.values());
  ws.send(JSON.stringify({
    type: 'participants',
    participants
  }));

  wss.clients.forEach(client => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 'participant_joined',
        participant: { id: clientId, name: clientName }
      }));
    }
  });

  console.log(`Client connected: ${clientName}`);

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      const client = clients.get(ws);

      let broadcastMessage = { ...message };

      switch (message.type) {
        case 'message':
          broadcastMessage.sender = client.name;
          broadcastMessage.senderId = client.id;
          break;

        case 'edit_message':
          broadcastMessage = {
            type: 'edit_message',
            messageId: message.messageId,
            content: message.content
          };
          break;

        case 'delete_message':
          broadcastMessage = {
            type: 'delete_message',
            messageId: message.messageId
          };
          break;
      }

      console.log(`Message from ${client.name}:`, broadcastMessage);

      wss.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(broadcastMessage));
        }
      });
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('close', () => {
    const client = clients.get(ws);
    clients.delete(ws);

    console.log(`Client disconnected: ${client.name}`);

    wss.clients.forEach(remainingClient => {
      if (remainingClient.readyState === WebSocket.OPEN) {
        remainingClient.send(JSON.stringify({
          type: 'participant_left',
          participantId: client.id
        }));
      }
    });
  });
});

console.log('WebSocket server is running on ws://localhost:8080');