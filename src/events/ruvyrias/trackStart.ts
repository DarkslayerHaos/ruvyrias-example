import { TextChannel, Colors } from 'discord.js';
import { Player, Track } from 'ruvyrias';
import { BaseClient } from '../../structures/BaseClient';
import { BaseEvent } from '../../structures/BaseEvent';

export default class TrackStart extends BaseEvent {
    public execute(client: BaseClient, player: Player, track: Track): void {
        const timestamp = track.info.length / 1000;
        const hours = Math.floor(timestamp / 60 / 60);
        const minutes = Math.floor(timestamp / 60) - (hours * 60);
        const seconds = Math.floor(timestamp % 60);

        const formatted = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

        const channel = client.channels.cache.get(player.textChannel!) as TextChannel;
        channel.send({
            embeds:
                [{
                    title: `✅ Playing now:`,
                    description: `[${track.info.title}](${track.info.uri})
                    Duration: [\`${player.currentTrack!.info.isStream ? 'LIVE' : formatted}\`]\n
                    Requester: [${(track.info.requester).toString()}]`,
                    thumbnail: { url: track.info?.artworkUrl as string },
                    color: Colors.Green
                }]
        });
    }
}