import { ListGroup } from "react-bootstrap";

const MessageContainer = ({ messages }) => {
    return (
        <div>
            <ListGroup>
                {messages.map((message, index) => (
                    <ListGroup.Item key={index}>
                        <strong>{message.username}:</strong> {message.message}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default MessageContainer;