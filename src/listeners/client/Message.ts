import { Listener } from "discord-akairo";

export default class Message extends Listener {
    public constructor() {
        super("message", {
            emitter: "client",
            event: "message",
            category: "client"
        });
    }

    public async exec(message): Promise<Message> {
        if(message.author.bot) return;
    }
}