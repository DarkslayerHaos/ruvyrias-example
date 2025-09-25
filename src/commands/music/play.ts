import { Colors, ChatInputCommandInteraction, GuildMember, Message } from 'discord.js';
import { CustomClient } from '../../structures/CustomClient';
import { Command } from '../../structures/Command';
import { Player } from 'ruvyrias';

export default class Play extends Command {
    private constructor() {
        super({
            name: 'play',
            description: '🎶 | Plays a desired music.',
            category: 'music',
            options: [
                {
                    name: 'query',
                    description: '🔌 | Enter name, link or YouTube playlist link | SoundCloud | Spotify | Deezer.',
                    type: 3,
                    required: true
                }
            ],
            permissions: {
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
            }
        });
    }

    public async execute(client: CustomClient, interaction: ChatInputCommandInteraction, _player: Player):
        Promise<ChatInputCommandInteraction | Message | void> {
        if (!await this.checkPermissions(interaction)) return;

        const search = interaction.options.getString('query') as string;

        let player = client.manager.get(interaction.guildId as string);
        if (!player) {
            player = client.manager.createPlayer({
                guildId: interaction.guildId as string,
                voiceChannelId: (interaction.member as GuildMember).voice.channelId,
                textChannelId: interaction.channelId,
                selfDeaf: true
            });
        }

        const res = await client.manager.search({ query: search, requester: interaction.member });
        const { loadType, tracks, playlistInfo } = res;

        if (loadType === 'error' || loadType === 'empty') {
            return await interaction.editReply({ embeds: [{ description: `❌ An error occurred, please try again!`, color: Colors.Red }] });
        }

        if (loadType === 'playlist') {
            for (const track of tracks) {
                player.queue.add(track);
            }

            if (!player.isPlaying && !player.isPaused) player.play();
            return await interaction.editReply({
                embeds:
                    [{
                        description: `🎶 [${playlistInfo?.name}](${search}) with \`${tracks.length}\` tracks added.`,
                        color: Colors.Green
                    }]
            });
        } else if (loadType === 'search' || loadType === 'track') {
            const track = tracks[0];
            player.queue.add(track);

            if (!player.isPlaying && !player.isPaused) player.play();
            await interaction.editReply({
                embeds: [{
                    description: `🎶 [${track.info.title ? track.info.title : 'Unknown'}](${track.info.uri}) added to queue.`,
                    color: Colors.Green
                }]
            });
        }
    }
}