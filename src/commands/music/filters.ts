import { Client, Message, Colors } from 'discord.js';
import { BaseCommand } from '../../structures/BaseCommand';
import { Player } from 'ruvyrias';

export default class Filters extends BaseCommand {
    private constructor() {
        super({
            name: 'filters',
            aliases: []
        });
    }

    public async execute(client: Client, message: Message, player: Player, args: string[]): Promise<void> {
        if (!message.guild?.members.me?.permissions.has('SendMessages')) return;
        if (!message.guild?.members.me?.permissionsIn(message.channelId).has('SendMessages')) return;

        const filters = {
            'disable': async () => { await player.filters.clearFilters(); },
            'nightcore': async () => { await player.filters.setNightcore(true); },
            'vaporwave': async () => { await player.filters.setVaporwave(true); },
            'chipmunk': async () => { await player.filters.setChipmunk(true); },
            '8d': async () => { await player.filters.set8D(true); }
        };

        const filterName = args[0] as keyof typeof filters;

        if (filterName && filters.hasOwnProperty(filterName)) {
            await filters[filterName]();
            message.channel.send({
                embeds:
                    [{
                        description: `🎶 Filter ${filterName == 'disable' ? `**disabled**` : `**${filterName}** enabled`}.`,
                        color: Colors.Green
                    }]
            });
        } else {
            message.channel.send({ embeds: [{ description: `❌ Invalid filter specified.`, color: Colors.Red }] });
        }
    }
}