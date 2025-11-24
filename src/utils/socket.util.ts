import {Server} from "socket.io";

const roomMembers: Record<string, string[]> = {};

export const initializeSocketServer = (io: Server) => {
    io.on('connection', (socket) => {
        socket.on('join_room', (roomId: string) => {
            try {
                socket.join(roomId);

                if (!roomMembers[roomId]) {
                    roomMembers[roomId] = [];
                }
                roomMembers[roomId].push(socket.id);

                console.log(`Socket ${socket.id} joined room ${roomId}`);

                socket.to(roomId).emit("peer-joined", {
                    peerId: socket.id
                });
            } catch (error) {
                console.error(`Failed to join room ${roomId}`, error);
            }
        });

        socket.on('leave_rooms', () => {
            try {
                for (const roomId in roomMembers) {
                    const members = roomMembers[roomId];
                    const idx = members.indexOf(socket.id);
                    if (idx !== -1) {
                        members.splice(idx, 1);
                        socket.to(roomId).emit("peer-left", { peerId: socket.id });
                    }
                }
            } catch (error) {
                console.error('Failed to leave rooms', error);
            }
        })

        socket.on("rtc-signal", (payload) => {
            const { to } = payload;
            io.to(to).emit("rtc-signal", payload);
        });
    });
}