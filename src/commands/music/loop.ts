import { Message, Colors, ChatInputCommandInteraction } from 'discord.js';
import { CustomClient } from '../../structures/CustomClient';
import { Command } from '../../structures/Command';
import { LoopType, Player } from 'ruvyrias';

export default class Loop extends Command {
    private constructor() {
        super({
            name: 'loop',
            description: '🎵 | Turns on or off the music or current playback queue loop.',
            category: 'music',
            options: [
                {
                    name: 'mode',
                    description: '🔌 | Select which mode you want to use.',
                    type: 3,
                    required: true,
                    choices: [
                        { name: 'Disable', value: LoopType.Off },
                        { name: 'Current Track', value: LoopType.Track },
                        { name: 'Queue', value: LoopType.Queue }
                    ]
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

        const mode = interaction.options.getString('mode', true) as LoopType;
        player.setLoop(mode);

        let desc: string;
        switch (mode) {
            case LoopType.Off:
                desc = '🔴 Loop disabled.';
                break;
            case LoopType.Track:
                desc = '🔁 Track loop enabled.';
                break;
            case LoopType.Queue:
                desc = '🔂 Queue loop enabled.';
                break;
            default:
                desc = '❓ Unknown loop mode.';
        }

        return await interaction.editReply({ embeds: [{ description: desc, color: Colors.Green }] });
    }
}