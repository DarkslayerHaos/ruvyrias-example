import { Message, Colors } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseCommand } from '../../structures/BaseCommand';
import { Player } from 'ruvyrias';

export default class Save extends BaseCommand {
    private constructor() {
        super({
            name: 'save',
            aliases: []
        });
    }

    public async execute(client: BaseClient, message: Message, player: Player): Promise<Message | void> {
        if (!this.checkPlayerState(message, player)) return;
        if (!message.guild?.members.me?.permissions.has('SendMessages')) return;
        if (!message.guild?.members.me?.permissionsIn(message.channelId).has('SendMessages')) return;

        message.author.send({ content: `${player.currentTrack!.info.uri}` }).catch(() => {
            message.reply({ embeds: [{ description: `❌ Your DMs need to be open!`, color: Colors.Red }] });
        });

        message.react('✅').catch(() => null);
    }
}