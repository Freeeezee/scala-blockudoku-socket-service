import express from 'express';
import gameRoute from "./routes/game.route";
import cors from "cors";
import dotenv from "dotenv";
import {createServer} from "node:http";
import {SocketService} from "./services/socket.service";

const app = express();

const server = createServer(app);

dotenv.config();
const port = process.env.PORT || 3000;
const apiUrl = process.env.API_URL;

app.use(express.json());
app.use(
    cors({
        origin: apiUrl,
        methods: "*",
        allowedHeaders: "*",
        credentials: true,
    })
);

app.use('/game', gameRoute);

SocketService.getInstance().init(server);

server.listen(port, () => {
    console.log(`Socket service listening on port ${port}`)
});