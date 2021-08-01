import { Command } from "discord-akairo";
import { Message, MessageEmbed, GuildMember } from "discord.js";
import { fetch } from 'node-fetch';


export default class DjsCommand extends Command {
    constructor() {
        super("djs", {
            aliases: ["docs"],
            category: "Public",
            description: {
                content: "pulls info from djs docs",
                usage: "djs [ args ]",
                examples: [
                    "djs Client",
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: "query",
                    type: "string",
                }
            ]
        });
    }
    public async exec(message: Message, { query }: { query: string }): Promise<Message> {
        const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`

        const docFetch = await fetch(url);
        const embed = docFetch.json();

        if(!embed || embed.error ) {
            return await message.reply(`Invaild content ${query}`)
        }

        if(!message.guild) {
            await message.reply({ embed })
        }

        const msg = await message.channel.send(embed)
        await msg.react('❌');

        let react;

        try {
            react = await msg.awaitReactions(
                (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id,
                { max: 1, time: 10000, errors: ['time']}
            )
        } catch (e) {
            await msg.reactions.removeAll();
            await msg.reply(`**ERROR** ${e}`)
        }

        if(react && react.first()) await message.delete();

    }
}