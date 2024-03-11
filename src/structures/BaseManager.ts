import { Client, TextChannel, Colors } from 'discord.js';
import { Ruvyrias, Deezer } from 'ruvyrias';
import { nodes } from '../settings/config';

const deezer = new Deezer();

export = (client: Client) => {
    return new Ruvyrias(client, nodes, {
        library: 'discord.js',
        defaultPlatform: 'ytsearch',
        plugins: [deezer],
        reconnectTries: Infinity,
        reconnectTimeout: 1000 * 10,
    })
        .on('nodeConnect', (node) => console.log(`[+] Lavalink ${node.name} successfully connected.`))
        .on('nodeError', (node, error) => console.log(`Node '${node.options.name}' errored: ${error.message}.`))
        .on('trackStart', (player, track) => {
            const timestamp = track.info.length / 1000;
            const hours = Math.floor(timestamp / 60 / 60);
            const minutes = Math.floor(timestamp / 60) - (hours * 60);
            const seconds = timestamp % 60;

            const formatted = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

            const channel = client.channels.cache.get(player.textChannel);
            (channel as TextChannel).send({
                embeds:
                    [{
                        title: `✅ Playing now:`,
                        description: `[${track.info.title}](${track.info.uri})\n[\`${formatted || 'LIVE'}\`]\n\nRequester: ${(track.info.requester).toString()}`,
                        thumbnail: { url: track.info?.artworkUrl as string },
                        color: Colors.Green
                    }]
            });
        })
        .on('queueEnd', player => {
            const channel = client.channels.cache.get(player.textChannel) as TextChannel;
            channel.send({ embeds: [{ description: `✅ End of the playlist, leaving the voice channel.`, color: Colors.Green }] });
            player.stop();
        })
}