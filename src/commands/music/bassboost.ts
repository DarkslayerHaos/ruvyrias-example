import { Message, Colors } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseCommand } from '../../structures/BaseCommand';
import { Player } from 'ruvyrias';

const levels = {
    none: 0.0,
    low: 0.10,
    medium: 0.15,
    high: 0.25,
};

export default class BassBoost extends BaseCommand {
    private constructor() {
        super({
            name: 'bassboost',
            aliases: ['bs', 'bass']
        });
    }

    public async execute(client: BaseClient, message: Message, player: Player, args: string[]): Promise<Message | void> {
        if (!this.checkPlayerState(message, player)) return;
        if (!message.guild?.members.me?.permissions.has('SendMessages')) return;
        if (!message.guild?.members.me?.permissionsIn(message.channelId).has('SendMessages')) return;

        let level = 'none';
        if (args.length && args[0].toLowerCase() in levels) level = args[0].toLowerCase();

        const bands = new Array(3)
            .fill(null)
            .map((_, i) =>
                ({ band: i, gain: (levels as never)[level] })
            );

        player.filters.setEqualizer([...bands]);

        message.reply({ embeds: [{ description: `✅ Bass adjusted to \`${level}\``, color: Colors.Green }] });
    }
}