import { Message, Colors, ChatInputCommandInteraction } from 'discord.js';
import { CustomClient } from '../../structures/CustomClient';
import { Command } from '../../structures/Command';
import { Player } from 'ruvyrias';

export default class Pause extends Command {
    private constructor() {
        super({
            name: 'pause',
            description: '⏸️ | Pauses the current music.',
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

        if (player.isPaused) {
            return await interaction.editReply({ embeds: [{ description: `❌ The music is already paused.`, color: Colors.Red }] });
        }

        await player.pause();
        await interaction.editReply({ embeds: [{ description: `✅ Music paused.`, color: Colors.Green }] });
    }
}