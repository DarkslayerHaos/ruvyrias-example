import { Message, Colors } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseCommand } from '../../structures/BaseCommand';

export default class Save extends BaseCommand {
    private constructor() {
        super({
            name: 'save',
            aliases: []
        });
    }

    public async execute(client: BaseClient, message: Message): Promise<Message | void> {
        if (!message.guild?.members.me?.permissions.has('SendMessages')) return;
        if (!message.guild?.members.me?.permissionsIn(message.channelId).has('SendMessages')) return;

        const player = client.manager.get(message.guild?.id);
        if (!player) {
            message.reply({ embeds: [{ description: `❌ The server doesn't have any active players.`, color: Colors.Red }] });
            return;
        }

        message.author.send({ content: `${player.currentTrack.info.uri}` }).catch(() => {
            message.reply({ embeds: [{ description: `❌ Your DMs need to be open!`, color: Colors.Red }] });
        });

        message.react('✅').catch(() => null);
    }
}