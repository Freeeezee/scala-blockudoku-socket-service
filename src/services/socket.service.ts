import {Server} from "socket.io";
import {Server as HttpServer} from "node:http";
import {initializeSocketServer} from "../utils/socket.util";
import {SocketEvent} from "../models/socket-event.model";

export class SocketService {
    private static instance: SocketService;

    private io: Server | null = null;

    public init(server: HttpServer) {
        this.io = new Server(server);

        initializeSocketServer(this.io);
    }

    public emitToRoom(roomId: string, event: SocketEvent, data?: any) {
        if (!this.io) throw new Error('Not initialized');

        this.io.to(roomId).emit(event, data);
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new SocketService();
        }

        return this.instance;
    }
}