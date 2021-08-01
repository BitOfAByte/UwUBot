import {Command} from "discord-akairo";
import {Message, MessageEmbed, GuildMember} from "discord.js";
import axios from "axios";


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

    public async exec(message: Message, {query}: { query: string }): Promise<any> {
        try {
            const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
                query
            )}`

            axios.get(uri).then(async (embed) => {
                const { data } = embed;

                if(data && !data.error) {
                    await message.channel.send({ embed: data })
                        .then(async res => {
                            await res.react('🗑️');

                            let react;

                            try {
                                react = await res.awaitReactions(
                                    (reaction, user) => reaction.emoji.name === '🗑️' && user.id === message.author.id,
                                    { max: 1, time: 10000, errors: ['time']}
                                )
                            } catch (e) {
                                await res.reactions.removeAll();
                                await message.reply(`**ERROR** ${e}`)
                            }

                            if(react && react.first()) await res.delete();

                            await message.delete({ timeout: 2000 })
                        })
                }
            })
        } catch (e) {
            await message.reply(e.message);
        }
    }
}