import { Request, Response } from 'express';
import {SocketService} from "../services/socket.service";
import {StateUpdateModel} from "../models/state-update.model";

export class GameController {
    static async updateState(req: Request, res: Response) {
        const data = req.body as StateUpdateModel;

        SocketService.getInstance().emitToRoom(data.sessionId, 'update-state', data.state);

        return res.status(200).send();
    }
}