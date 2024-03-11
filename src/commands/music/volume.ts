import { Message, VoiceState, Colors } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseCommand } from '../../structures/BaseCommand';

export default class Volume extends BaseCommand {
    private constructor() {
        super({
            name: 'volume',
            aliases: ['vol']
        });
    }

    public async execute(client: BaseClient, message: Message, args: string[]): Promise<Message | void> {
        if (!message.guild?.members.me?.permissions.has('SendMessages')) return;
        if (!message.guild?.members.me?.permissionsIn(message.channelId).has('SendMessages')) return;

        const player = client.manager.get(message.guild?.id);
        if (!player) {
            return message.reply({ embeds: [{ description: `❌ The server doesn't have any active players.`, color: Colors.Red }] });
        }

        const { channel } = message.member?.voice as VoiceState;
        if (!channel) {
            return message.reply({ embeds: [{ description: `❌ You need to join a voice channel.`, color: Colors.Red }] });
        }

        if (channel.id !== player.voiceChannel) {
            return message.reply({ embeds: [{ description: `❌ We are not in the same voice channel.`, color: Colors.Red }] });
        }

        const volume = Number(args[0]);
        if (!volume || volume < 1 || volume > 300) {
            message.reply({ embeds: [{ description: `❌ The volume needs to be between 1 and 300.`, color: Colors.Red }] });
            return;
        }

        player.setVolume(volume);
        message.reply({ embeds: [{ description: `✅ Volume adjusted to \`${volume}\`.`, color: Colors.Green }] });
    }
}