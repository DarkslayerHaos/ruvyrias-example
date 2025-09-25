import { Message, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';
import { CustomClient } from '../../structures/CustomClient';
import { Command } from '../../structures/Command';
import { Player } from 'ruvyrias';

export default class Queue extends Command {
    private constructor() {
        super({
            name: 'queue',
            description: '🎶 | Displays the current playback queue.',
            category: 'music',
            options: [
                {
                    name: 'page',
                    description: '🔌 | Enter the page you want to see.',
                    type: 3,
                    required: true
                }
            ],
            permissions: {
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: ['SendMessages', 'ViewChannel'],
            }
        });
    }

    public async execute(client: CustomClient, interaction: ChatInputCommandInteraction, player: Player): Promise<Message | void> {
        if (!await this.checkPermissions(interaction)) return;
        if (!await this.checkPlayerState(interaction, player)) return;

        const queue = player.queue;
        const embed = new EmbedBuilder().setColor('#000001').setAuthor({ name: `Queue for ${interaction.guild?.name}` });

        const multiple = 10;
        const page = Number(interaction.options.getString('page')) as number;

        const end = page * multiple;
        const start = end - multiple;

        const tracks = queue.slice(start, end);

        if (player.currentTrack) embed.addFields({ name: `🎶 Playing now`, value: `[${player.currentTrack.info.title}](${player.currentTrack.info.uri})` });

        if (!tracks.length) {
            embed.setDescription(`No tracks ${page > 1 ? `pages ${page}` : `in the queue`}.`);
        } else {
            embed.setDescription(tracks.map((track, i) => `${start + (++i)} - [${track.info.title}](${track.info.uri})`).join('\n'));
        }

        const maxPages = Math.ceil(queue.length / multiple);
        embed.setFooter({ text: `Pages ${page > maxPages ? maxPages : page} of ${maxPages} ` });
        embed.setThumbnail(interaction.guild?.iconURL({ size: 4096 }) as string);
        embed.setColor('Purple')

        await interaction.editReply({ embeds: [embed] });
    }
}