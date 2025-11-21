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

        socket.on('leave_rooms', () => {
            try {
                const rooms = Array.from(socket.rooms);
                rooms.forEach(room => {
                    if (room !== socket.id) {
                        socket.leave(room);
                    }
                });
            } catch (error) {
                console.error('Failed to leave rooms', error);
            }
        })
    });
}