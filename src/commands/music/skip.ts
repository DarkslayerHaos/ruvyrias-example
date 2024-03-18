import { Message, Colors } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseCommand } from '../../structures/BaseCommand';
import { Player } from 'ruvyrias';

export default class Skip extends BaseCommand {
    private constructor() {
        super({
            name: 'skip',
            aliases: ['next', 'n', 'sk']
        });
    }

    public async execute(client: BaseClient, message: Message, player: Player): Promise<Message | void> {
        if (!this.checkPlayerState(message, player)) return;
        if (!message.guild?.members.me?.permissions.has('SendMessages')) return;
        if (!message.guild?.members.me?.permissionsIn(message.channelId).has('SendMessages')) return;

        const { title, uri } = player.currentTrack.info;
        player.skip();

        message.reply({ embeds: [{ description: `✅ [${title}](${uri}) skipped.`, color: Colors.Green }] });
    }
}