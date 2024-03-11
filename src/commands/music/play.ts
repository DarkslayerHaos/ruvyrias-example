import { Message, PermissionFlagsBits, Colors } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseCommand } from '../../structures/BaseCommand';

export default class Play extends BaseCommand {
    private constructor() {
        super({
            name: 'play',
            aliases: ['p']
        });
    }

    public async execute(client: BaseClient, message: Message, args: string[]): Promise<Message | void> {
        if (!message.guild?.members.me?.permissions.has('SendMessages')) return;
        if (!message.guild?.members.me?.permissionsIn(message.channelId).has('SendMessages')) return;
        if (!message.guild?.members.me?.permissions.has([PermissionFlagsBits.Connect, PermissionFlagsBits.Speak])) {
            return message.reply({ embeds: [{ description: `❌ I don't have permission to connect to the channel!`, color: Colors.Red }] });
        }

        if (!message.member?.voice.channel) {
            return message.reply({ embeds: [{ description: `❌ You need to be in a voice channel to use this command!`, color: Colors.Red }] });
        }

        if (message.guild?.members.me?.voice.channel && message.guild?.members.me?.voice.channel.id !== message.member.voice.channel.id) {
            return message.reply({ embeds: [{ description: `❌ I am connected to another channel at the moment!`, color: Colors.Red }] });
        }

        const search = args.join(' ');
        if (!search) {
            return message.reply({ embeds: [{ description: `❌ You need to enter a valid **name** or **link**!`, color: Colors.Red }] });
        }

        let player = client.manager.get(message.guildId as string);
        if (!player) {
            player = client.manager.createConnection({
                guildId: message.guild?.id,
                voiceChannel: message.member.voice.channel.id,
                textChannel: message.channel.id,
                deaf: true
            });
        }

        const res = await client.manager.resolve({ query: search, requester: message.author });
        const { loadType, tracks, playlistInfo } = res;

        if (loadType === 'error' || loadType === 'empty') {
            return message.reply({ embeds: [{ description: `❌ An error occurred, please try again!`, color: Colors.Red }] });
        }

        if (loadType === 'playlist') {
            for (const track of tracks) {
                player.queue.add(track);
            }

            if (!player.isPlaying && !player.isPaused) player.play();
            return message.reply({ embeds: [{ description: `🎶 [${playlistInfo?.name}](${search}) with \`${tracks.length}\` tracks added.`, color: Colors.Green }] });
        } else if (loadType === 'search' || loadType === 'track') {
            const track = tracks[0];
            player.queue.add(track);

            if (!player.isPlaying && !player.isPaused) player.play();
            message.reply({ embeds: [{ description: `🎶 [${track.info.title ? track.info.title : 'Unknown'}](${track.info.uri}) added to queue.`, color: Colors.Green }] });
        }
    }
}