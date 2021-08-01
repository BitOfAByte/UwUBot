import { Command } from 'discord-akairo'
import { Message, MessageEmbed } from "discord.js";
import { stripIndents } from 'common-tags';

export default class HelpCommand extends Command {
    constructor() {
        super("help", {
            aliases: ["help", "commands", "cmds"],
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
            args: [
                {
                    id: "command",
                    type: "commandAlias",
                    default: null
                }
            ]
        });
    }

    public async exec(message: Message, { command }: { command: Command }): Promise<Message> {
        if(command) {
            return message.channel.send(new MessageEmbed()
                .setAuthor(`Help | ${command}`, this.client.user.displayAvatarURL())
                .setColor("RANDOM")
                .setDescription(stripIndents `
                    **Description:**
                    ${command.description.content || "No content provided"} 
                   
                    **Usage:**
                    ${command.description.usage || "No usage provided"}
                    
                    **Examples:**
                    ${command.description.examples ? command.description.examples.map(e => `\`${e}\``).join("\n") : "No examples provided"}
                `)
            );
        }

        const embed = new MessageEmbed()
            .setAuthor(`Help | ${this.client.user.username}`, this.client.user.displayAvatarURL())
            .setColor("RANDOM")
            .setFooter(`${this.client.commandHandler.prefix}help [command] for more information on a command`)
        for(const category of this.handler.categories.values()) {
            if(["default"].includes(category.id)) continue;

            embed.addField(category.id, category
                .filter(cmd => cmd.aliases.length > 0)
                .map(cmd => `**\`${cmd}\`**`)
                .join(", ") || "No command aliases in this category."
            );
        }

        return message.channel.send(embed);
    }

}