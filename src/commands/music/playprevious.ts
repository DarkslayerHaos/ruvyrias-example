import { Message, Colors, ChatInputCommandInteraction } from 'discord.js';
import { CustomClient } from '../../structures/CustomClient';
import { Command } from '../../structures/Command';
import { Player } from 'ruvyrias';

export default class Skip extends Command {
    private constructor() {
        super({
            name: 'playprevious',
            description: '⏮️ | Plays the previous song once more.',
            category: 'music',
            permissions: {
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: ['SendMessages', 'ViewChannel'],
            }
        });
    }

    public async execute(client: CustomClient, interaction: ChatInputCommandInteraction, player: Player): Promise<Message | void> {
        if (!await this.checkPermissions(interaction)) return;
        if (!await this.checkPlayerState(interaction, player)) return;

        if (!player.previousTrack) {
            return await interaction.editReply({ embeds: [{ description: `❌ No previously played music.`, color: Colors.Red }] });
        }

        player.queue.unshift(player.previousTrack);
        await player.skip();

        const { title, uri } = player.currentTrack!.info

        await interaction.editReply({ embeds: [{ description: `🎶 [${title}](${uri}) playing again.`, color: Colors.Green }] });
    }
}