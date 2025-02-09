
# Chat Applications


## Live App

- It's just for the UI. Since the server is running locally, we need to build and run it locally to test the chat functionality properly.

[Click Here](https://chat-frontend-test.netlify.app//)

or

https://chat-frontend-test.netlify.app/

## Features

### Core Features
- Real-time messaging using WebSocket
- Edit and delete messages
- Active participants list
- Emoji support
- Multiple themes (Light, Dark, Purple)
- Responsive design (Mobile, Tablet, Desktop)


## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd test-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the WebSocket server:
```bash
cd chat-server
npm install
npm start
```


The application will be available at `http://localhost:5173`

## Project Structure

```
test-frontend/
|
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatMessage.tsx
│   │   │   ├── MessageInput.tsx
│   │   │   ├── ParticipantsList.tsx
│   │   │   ├── EmojiPicker.tsx
│   │   │   ├── ParticipantsList.tsx
│   │   │   └── ThemeSelector.ts
│   │   ├── contexts/
│   │   │   └── theme-context.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
└── chat-server/
    ├── src/
    │   └── server.js
    └── package.json
```

## Technologies Used

- React 18
- TypeScript
- WebSocket (ws)
- Tailwind CSS
- Lucide Icons

## Features in Detail

### Real-time Communication
- WebSocket connection for instant messaging
- Message synchronization across clients

### Message Management
- Send text messages
- Edit own messages
- Delete own messages
- Message status indicators (edited/deleted)

### Theme Support
- Light theme
- Dark theme
- Purple theme
- Persistent theme selection
- Optimized spacing and layout


## Potential Improvements

- Add authentication
- Add message search functionality
- Implement file sharing
- Add typing indicators
- Add message reactions
- Add message threading
- Improve error handling
- Add unit and integration tests
- Add message persistence
- Add user profiles

## Development Time

Approximately 4 hours were spent on this implementation.
