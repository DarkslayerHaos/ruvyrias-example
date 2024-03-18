import { Message, Colors } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseCommand } from '../../structures/BaseCommand';
import { Player } from 'ruvyrias';

export default class Volume extends BaseCommand {
    private constructor() {
        super({
            name: 'volume',
            aliases: ['vol']
        });
    }

    public async execute(client: BaseClient, message: Message, player: Player, args: string[]): Promise<Message | void> {
        if (!this.checkPlayerState(message, player)) return;
        if (!message.guild?.members.me?.permissions.has('SendMessages')) return;
        if (!message.guild?.members.me?.permissionsIn(message.channelId).has('SendMessages')) return;

        const volume = Number(args[0]);
        if (!volume || volume < 1 || volume > 1000) {
            message.reply({ embeds: [{ description: `❌ The volume needs to be between 1 and 1000.`, color: Colors.Red }] });
            return;
        }

        player.setVolume(volume);
        message.reply({ embeds: [{ description: `✅ Volume adjusted to \`${volume}\`.`, color: Colors.Green }] });
    }
}