import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const WaitingRoom = ({ joinChatRoom }) => {
    const [username, setUserName] = useState();
    const [chatroom, setChatRoom] = useState();

    return <Form onSubmit={e => {
        e.preventDefault();
        joinChatRoom(username, chatroom);}}>
        <Row className="px-5 py-5">
            <Col sm="12">
                <Form.Group>
                    <Form.Control className="mb-3" placeholder="Username"
                        onChange={e => setUserName(e.target.value)} />
                    <Form.Control className="mb-3" placeholder="ChatRoom"
                        onChange={e => setChatRoom(e.target.value)} />
                </Form.Group>
            </Col>
            <Col sm="12">
                <Button variant="success" type="submit">Join Chat Room</Button>
            </Col>
        </Row>
    </Form>
}

export default WaitingRoom;