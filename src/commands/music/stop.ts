import { Message, Colors, ChatInputCommandInteraction } from 'discord.js';
import { CustomClient } from '../../structures/CustomClient';
import { Command } from '../../structures/Command';
import { Player } from 'ruvyrias';

export default class Stop extends Command {
    private constructor() {
        super({
            name: 'stop',
            description: '⛔ | Ends the music queue and leaves the channel.',
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

        await player.stop();
        await interaction.editReply({ embeds: [{ description: `✅ Stopping music and leaving the voice channel.`, color: Colors.Green }] });
    }
}