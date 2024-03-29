import { Message, Colors } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseCommand } from '../../structures/BaseCommand';
import { Player } from 'ruvyrias';

export default class Pause extends BaseCommand {
    private constructor() {
        super({
            name: 'pause',
            aliases: []
        });
    }

    public async execute(client: BaseClient, message: Message, player: Player): Promise<Message | void> {
        if (!this.checkPlayerState(message, player)) return;
        if (!message.guild?.members.me?.permissions.has('SendMessages')) return;
        if (!message.guild?.members.me?.permissionsIn(message.channelId).has('SendMessages')) return;

        if (player.isPaused) {
            return message.reply({ embeds: [{ description: `❌ The music is already paused.`, color: Colors.Red }] });
        }

        player.pause(true);
        message.reply({ embeds: [{ description: `✅ Music paused.`, color: Colors.Green }] });
    }
}