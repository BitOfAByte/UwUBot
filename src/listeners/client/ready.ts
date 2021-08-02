import { Listener } from 'discord-akairo';
const database = require("../../database/database");
import Punishments from '../../database/Models/Punishment';

export default class ready extends Listener {
    public constructor() {
        super("ready", {
            emitter: "client",
            event: "ready",
            category: "client"
        });
    }


    public async exec(): Promise<void> {

        try {
            await database.authenticate().then(() => {
                console.log('Connection has been established successfully.');
                Punishments.init(database);
            }).catch(err => console.error(err))
        } catch (e) {
            console.error(e);
        }
        console.log(`Logged in as ${this.client.user.tag}`);
    }
}