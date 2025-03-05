import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";


const SendMessageForm = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <InputGroup.Text>Message</InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}/>
          <Button variant="primary" type="submit" disabled= {!message}>Send</Button>
      </InputGroup>
    </Form>
  );
};

export default SendMessageForm;