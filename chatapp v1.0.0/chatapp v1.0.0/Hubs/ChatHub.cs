using chatapp_v1._0._0.Data;
using chatapp_v1._0._0.Models;
using Microsoft.AspNetCore.SignalR;

namespace chatapp_v1._0._0.Hubs
{
    // ChatHub class is a SignalR Hub class that is used to
    // establish connection and bi connection communication between users and server
    // It is used to send and receive messages between users through the server
    // integrated with the SignalR library pipeline endpoint have (hub for notification, hub for chatting)
    public class ChatHub : Hub
    {
        private readonly ShareDB _shared;

        public ChatHub(ShareDB shared)
        {
            _shared = shared;
        }
        public async Task JoinChat(UserConnection conn)
        {
            // clinets : allow us to send message to all connected clients
            // All : send message to all connected clients
            // SendAsync : send message to all connected clients
            await Clients.All.SendAsync("ReceiveMessage", "admin", $"{conn.UserName} has joined");
        }
        public async Task JoinSpecificChatRoom(UserConnection conn)
        {
            // Groups : allow us to send message to all connected clients in a group
            // AddToGroupAsync : add user to a group
            // ReceiveMessage : methoud =>  send message to all connected clients in a group
            _shared.connections[Context.ConnectionId] = conn;
            await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChatRoom);
            await Clients.Group(conn.ChatRoom).SendAsync("ReceiveMessage", "admin", $"{conn.UserName} has joined {conn.ChatRoom}");
        }
        public async Task SendMessage(string msg)
        {
            if (_shared.connections.TryGetValue(Context.ConnectionId, out UserConnection conn))
            {
                await Clients.Group(conn.ChatRoom).SendAsync("ReceiveSpecificMessage", conn.UserName, msg);
            }
        }
    }
}
