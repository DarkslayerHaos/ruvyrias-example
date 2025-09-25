import { Message, Colors, ChatInputCommandInteraction } from 'discord.js';
import { CustomClient } from '../../structures/CustomClient';
import { Command } from '../../structures/Command';
import { Player } from 'ruvyrias';

export default class Skip extends Command {
    private constructor() {
        super({
            name: 'skip',
            description: '⏭️ | Skips the current song.',
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

        const { title, uri } = player.currentTrack!.info;

        await player.skip();
        await interaction.editReply({ embeds: [{ description: `✅ [${title}](${uri}) skipped.`, color: Colors.Green }] });
    }
}