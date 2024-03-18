import { Message, Colors } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseCommand } from '../../structures/BaseCommand';
import { Player } from 'ruvyrias';

export default class Stop extends BaseCommand {
    private constructor() {
        super({
            name: 'stop',
            aliases: ['leave']
        });
    }

    public async execute(client: BaseClient, message: Message, player: Player): Promise<Message | void> {
        if (!this.checkPlayerState(message, player)) return;
        if (!message.guild?.members.me?.permissions.has('SendMessages')) return;
        if (!message.guild?.members.me?.permissionsIn(message.channelId).has('SendMessages')) return;

        player.stop();
        message.reply({ embeds: [{ description: `✅ Stopping music and leaving the voice channel.`, color: Colors.Green }] });
    }
}