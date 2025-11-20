import { Request, Response } from 'express';
import {SocketService} from "../services/socket.service";

export class GameController {
    static async updateState(req: Request, res: Response) {
        console.log(req.body);

        SocketService.getInstance().emitToRoom('abc', 'update-state', req.body);

        return res.status(200).send();
    }
}