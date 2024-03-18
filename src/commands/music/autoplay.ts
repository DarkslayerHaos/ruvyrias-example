import { Message, Colors } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseCommand } from '../../structures/BaseCommand';
import { Player } from 'ruvyrias';

export default class AutoPlay extends BaseCommand {
    private constructor() {
        super({
            name: 'autoplay',
            aliases: []
        });
    }

    public async execute(client: BaseClient, message: Message, player: Player): Promise<Message | void> {
        if (!this.checkPlayerState(message, player)) return;
        if (!message.guild?.members.me?.permissions.has('SendMessages')) return;
        if (!message.guild?.members.me?.permissionsIn(message.channelId).has('SendMessages')) return;

        if (!player.isAutoPlay) {
            player.isAutoPlay = true;

            await player.autoplay(player);
            message.reply({ embeds: [{ description: `✅ Autoplay activated, new tracks will play automatically!`, color: Colors.Green }] });
        } else {
            player.isAutoPlay = false;

            message.reply({ embeds: [{ description: `✅ Autoplay deactivated, tracks will *not* play automatically!`, color: Colors.Green }] });
        }
    }
}