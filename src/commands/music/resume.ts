import { Message, Colors } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseCommand } from '../../structures/BaseCommand';
import { Player } from 'ruvyrias';

export default class Resume extends BaseCommand {
    private constructor() {
        super({
            name: 'resume',
            aliases: []
        });
    }

    public async execute(client: BaseClient, message: Message, player: Player): Promise<Message | void> {
        if (!this.checkPlayerState(message, player)) return;
        if (!message.guild?.members.me?.permissions.has('SendMessages')) return;
        if (!message.guild?.members.me?.permissionsIn(message.channelId).has('SendMessages')) return;

        if (!player.isPaused) {
            message.reply({ embeds: [{ description: `❌ The player has already resumed the music.`, color: Colors.Red }] });
            return;
        }

        player.pause(false);
        message.reply({ embeds: [{ description: `🎶 The music has been resumed.`, color: Colors.Blue }] });
    }
}