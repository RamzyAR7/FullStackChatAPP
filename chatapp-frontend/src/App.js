import { useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingRoom from './components/waitingroom';
import ChatRoom from './components/ChatRoom';

function App() {
  const [conn, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatroom) => {
    try {
      // Create a new connection
      const conn = new HubConnectionBuilder()
        .withUrl('https://localhost:7198/chatHub')
        .configureLogging(LogLevel.Information)
        .build();
      // setup the handlers
      conn.on('ReceiveMessage', (username, message) => {
        setMessages(messages => [...messages, { username, message }]);
      });

      conn.on('ReceiveSpecificMessage', (username, message) => {
        setMessages(messages => [...messages, { username, message }]);
      });

      // start the connection
      await conn.start();
      // Create a UserConnection object
      const userConnection = { UserName: username, ChatRoom: chatroom };
      await conn.invoke('JoinSpecificChatRoom', userConnection);
      setConnection(conn);
    } catch (e) {
      console.log(e);
    }
  }

const sendMessage = async (message) => {
  try {
    await conn.invoke('SendMessage', message);
  } catch (e) {
    console.log(e);
  }
}
  return (
    <div>
      <main>
        <Container>
          <Row className='px-5 my-5'>
            <Col sm='12'>
              <h1>Welcome to Chat App</h1>
            </Col>
          </Row>
          {!conn
            ? <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
            : <ChatRoom messages={messages} sendMessage={sendMessage}></ChatRoom>
          }
        </Container>
      </main>
    </div>
  );
}

export default App;