import {Server} from "socket.io";

export const initializeSocketServer = (io: Server) => {
    io.on('connection', (socket) => {
        socket.on('join_room', (roomId: string) => {
            try {
                socket.join(roomId);
            } catch (error) {
                console.error(`Failed to join room ${roomId}`, error);
            }
        });
    });
}