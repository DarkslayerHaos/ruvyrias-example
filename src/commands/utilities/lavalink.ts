import { CustomClient } from '../../structures/CustomClient';
import { ChatInputCommandInteraction, Colors } from 'discord.js';
import { Command } from '../../structures/Command';

export default class extends Command {
    private constructor() {
        super({
            name: 'lavalink',
            description: '📡 | Displays information related to the Lavalink server.',
            category: 'Utilities',
            permissions: {
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: ['SendMessages', 'ViewChannel'],
            }
        });
    }

    public async execute(client: CustomClient, interaction: ChatInputCommandInteraction): Promise<void> {
        if (!await this.checkPermissions(interaction)) return;

        const nodeName = Array.from(client.manager.nodes.keys())[0];
        const node = client.manager.nodes.get(nodeName);


        function formatUptime(ms: number) {
            const totalSeconds = Math.floor(ms / 1000);
            const days = Math.floor(totalSeconds / 86400);
            const hours = Math.floor((totalSeconds % 86400) / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);

            return `${days}d ${hours}h ${minutes}m`;
        }

        await interaction.editReply({
            embeds: [
                {
                    title: '📡 Lavalink Info',
                    fields: [
                        { name: `Name:`, value: `\`\`\`js\n${node?.options.name}\n\`\`\`` },
                        { name: `Connection:`, value: `\`\`\`js\n${node?.isConnected ? 'Connected [🟢]' : 'Disconnected [🔴]'}\n\`\`\``, inline: true },
                        { name: `Uptime:`, value: `\`\`\`js\n${formatUptime(node?.stats?.uptime ?? 0)}\n\`\`\``, inline: true },
                        { name: `Lavalink CPU:`, value: `\`\`\`js\n${(Math.round((node?.stats?.cpu.lavalinkLoad ?? 0) * 100) / 100).toFixed(2)}%\n\`\`\``, inline: true },
                        { name: `Cores:`, value: `\`\`\`js\n${node?.stats?.cpu.cores ?? 0} Core(s)\n\`\`\``, inline: true },
                        { name: `Memory in use:`, value: `\`\`\`js\n${~~((node?.stats?.memory.used ?? 0) / 1024 / 1024)}MB\n\`\`\``, inline: true },
                        { name: `System CPU:`, value: `\`\`\`js\n${(Math.round((node?.stats?.cpu?.systemLoad ?? 0) * 100) / 100).toFixed(2)}%\n\`\`\``, inline: true },
                        { name: `Players:`, value: `\`\`\`js\n${node?.stats?.players ?? 0}\n\`\`\``, inline: true },
                        { name: `Players in use:`, value: `\`\`\`js\n${node?.stats?.playingPlayers ?? 0}\n\`\`\``, inline: true },
                    ],
                    color: Colors.Blue,
                    timestamp: new Date().toISOString(),
                }
            ]
        });
    };
}