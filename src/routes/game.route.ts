import express from "express";
import {GameController} from "../controller/game.controller";

const gameRoute = express.Router();
gameRoute.post('/', GameController.updateState);

export default gameRoute;