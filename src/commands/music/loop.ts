import { Message, VoiceState, Colors } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseCommand } from '../../structures/BaseCommand';
import { Player } from 'ruvyrias';

export default class Loop extends BaseCommand {
    private constructor() {
        super({
            name: 'loop',
            aliases: []
        });
    }

    public async execute(client: BaseClient, message: Message, player: Player, args: string[]): Promise<Message | void> {
        if (!this.checkPlayerState(message, player)) return;
        if (!message.guild?.members.me?.permissions.has('SendMessages')) return;
        if (!message.guild?.members.me?.permissionsIn(message.channelId).has('SendMessages')) return;

        if (args.length && /queue/i.test(args[0])) {
            player.setLoop('QUEUE');

            return message.reply({ embeds: [{ description: `${player.loop.replace('QUEUE', 'Enabled')} queue loop.`, color: Colors.Green }] });
        }

        player.setLoop('TRACK');

        message.reply({ embeds: [{ description: `${player.loop.replace('TRACK', 'Enabled')} track loop.`, color: Colors.Green }] });
    }
}