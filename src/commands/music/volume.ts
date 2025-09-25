import { Message, Colors, ChatInputCommandInteraction } from 'discord.js';
import { CustomClient } from '../../structures/CustomClient';
import { Command } from '../../structures/Command';
import { Player } from 'ruvyrias';

export default class Volume extends Command {
    private constructor() {
        super({
            name: 'volume',
            description: '🔊 | Adjusts the music volume.',
            category: 'music',
            options: [
                {
                    name: 'value',
                    description: '🔌 | Enter a value between 1 and 300.',
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
        const volume = Number(interaction.options.getString('value'));

        if (!volume || volume < 1 || volume > 1000) {
            await interaction.editReply({ embeds: [{ description: `❌ The volume needs to be between 1 and 1000.`, color: Colors.Red }] });
            return;
        }

        await player.setVolume(volume);
        await interaction.editReply({ embeds: [{ description: `✅ Volume adjusted to \`${volume}\`.`, color: Colors.Green }] });
    }
}