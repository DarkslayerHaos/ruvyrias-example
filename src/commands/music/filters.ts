import { Client, Message, Colors, ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../../structures/Command';
import { Player } from 'ruvyrias';

export default class Filters extends Command {
    private constructor() {
        super({
            name: 'filters',
            description: '🎵 | Applies a filter to the current playback queue.',
            category: 'music',
            options: [
                {
                    name: 'option',
                    description: '🔌 | Choose a filter from the list.',
                    type: 3,
                    required: true,
                    choices: [
                        { name: 'Disable', value: 'disable' }, { name: '8D', value: '8d' }, { name: 'Nightcore', value: 'nightcore' },
                        { name: 'Daycore', value: 'daycore' }, { name: 'Vaporwave', value: 'vaporwave' }, { name: 'Vibrato', value: 'vibrato' },
                        { name: 'Chipmunk', value: 'chipmunk' }
                    ]
                }
            ],
            permissions: {
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: ['SendMessages', 'ViewChannel'],
            }
        });
    }

    public async execute(client: Client, interaction: ChatInputCommandInteraction, player: Player): Promise<void> {
        if (!await this.checkPermissions(interaction)) return;
        if (!await this.checkPlayerState(interaction, player)) return;

        const effect = interaction.options.getString('option') as string;

        const filters = {
            'disable': async () => { await player.filters.clearFilters(); },
            'nightcore': async () => { await player.filters.setNightcore(true); },
            'daycore': async () => { await player.filters.setDaycore(true); },
            'vaporwave': async () => { await player.filters.setVaporwave(true); },
            'vibrato': async () => { await player.filters.setVibrato(); },
            'chipmunk': async () => { await player.filters.setChipmunk(true); },
            '8d': async () => { await player.filters.set8D(true); }
        };

        const filterName = effect as keyof typeof filters;

        if (filterName && filters.hasOwnProperty(filterName)) {
            await filters[filterName]();
            await interaction.editReply({
                embeds:
                    [{
                        description: `🎶 Filter ${filterName == 'disable' ? `**disabled**` : `**${filterName}** enabled`}.`,
                        color: Colors.Green
                    }]
            });
        } else {
            await interaction.editReply({ embeds: [{ description: `❌ Invalid filter specified.`, color: Colors.Red }] });
        }
    }
}