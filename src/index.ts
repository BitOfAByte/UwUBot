import { token, owners } from './config';
import botClient from "./client/botClient";

const client: botClient = new botClient({ token, owners });
client.start();