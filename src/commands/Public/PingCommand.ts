import { Command } from "discord-akairo";
import {Message} from "discord.js";

export default class PingCommand extends Command {
    constructor() {
        super("ping", {
            aliases: ['pong', 'ping'],
            category: "Public",
            description: {
                content: "I don't think I need to explain the command",
                usage: "help [cmd]",
                examples: [
                    "help",
                    "help ban"
                ]
            },
            ratelimit: 3,
        });
    }

    public async  exec(message: Message, args: any): Promise<Message> {
        return message.channel.send("Ping: " + this.client.ws.ping);
    }
}