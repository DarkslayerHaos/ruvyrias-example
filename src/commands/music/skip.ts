import { Message, VoiceState, Colors } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseCommand } from '../../structures/BaseCommand';

export default class Skip extends BaseCommand {
    private constructor() {
        super({
            name: 'skip',
            aliases: ['next', 'n', 'sk']
        });
    }

    public async execute(client: BaseClient, message: Message): Promise<Message | void> {
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

        if (!player) {
            return message.reply({ embeds: [{ description: `❌ The player has already paused the music.`, color: Colors.Red }] });
        }

        const { title, uri } = player.currentTrack.info;
        player.skip();

        message.reply({ embeds: [{ description: `✅ [${title}](${uri}) skipped.`, color: Colors.Green }] });
    }
}