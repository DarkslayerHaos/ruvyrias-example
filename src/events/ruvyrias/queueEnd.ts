import { CustomClient } from '../../structures/CustomClient';
import { BaseEvent } from '../../structures/Event';
import { TextChannel, Colors } from 'discord.js';
import { Player } from 'ruvyrias';

export default class QueueEnd extends BaseEvent {
    public async execute(client: CustomClient, player: Player): Promise<void> {
        player.stop();

        const channel = client.channels.cache.get(player.textChannelId as string) as TextChannel;
        channel.send({ embeds: [{ description: `✅ End of the playlist, leaving the voice channel.`, color: Colors.Green }] });
    }
}