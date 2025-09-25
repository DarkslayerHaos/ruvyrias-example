import { Client, ChatInputCommandInteraction, Colors } from 'discord.js';
import { Command } from '../../structures/Command';

export default class extends Command {
    private constructor() {
        super({
            name: 'ping',
            description: '🏓 | Returns my latency in real time.',
            category: 'utilities',
            permissions: {
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: ['SendMessages', 'ViewChannel'],
            }
        });
    }

    public async execute(client: Client, interaction: ChatInputCommandInteraction): Promise<void> {
        const startTime = Date.now();
        if (!await this.checkPermissions(interaction)) return;

        await interaction.editReply({
            embeds: [{
                fields: [
                    { name: `🏓 Ping:`, value: `${startTime - interaction.createdTimestamp}ms.` },
                    { name: `📌 API:`, value: `${client.ws.ping}ms.` }
                ],
                thumbnail: { url: client.user?.avatarURL({ size: 4096 }) as string },
                color: Colors.DarkGreen
            }]
        });
    }
}