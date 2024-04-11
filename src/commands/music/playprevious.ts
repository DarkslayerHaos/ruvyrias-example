import { Message, Colors } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseCommand } from '../../structures/BaseCommand';
import { Player } from 'ruvyrias';

export default class Skip extends BaseCommand {
    private constructor() {
        super({
            name: 'playprevious',
            aliases: ['previous']
        });
    }

    public async execute(client: BaseClient, message: Message, player: Player): Promise<Message | void> {
        if (!this.checkPlayerState(message, player)) return;
        if (!message.guild?.members.me?.permissions.has('SendMessages')) return;
        if (!message.guild?.members.me?.permissionsIn(message.channelId).has('SendMessages')) return;

        if (!player.previousTrack) {
            return message.reply({ embeds: [{ description: `❌ No previously played music.`, color: Colors.Red }] });
        }

        player.queue.unshift(player.previousTrack);
        player.skip();

        const { title, uri } = player.currentTrack!.info

        message.reply({ embeds: [{ description: `🎶 [${title}](${uri}) playing again.`, color: Colors.Green }] });
    }
}