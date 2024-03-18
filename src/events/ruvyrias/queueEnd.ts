import { TextChannel, Colors } from 'discord.js';
import { Player } from 'ruvyrias';
import { BaseClient } from '../../structures/BaseClient';
import { BaseEvent } from '../../structures/BaseEvent';

export default class QueueEnd extends BaseEvent {
    public async execute(client: BaseClient, player: Player): Promise<void> {
        player.stop();

        const channel = client.channels.cache.get(player.textChannel) as TextChannel;
        channel.send({ embeds: [{ description: `✅ End of the playlist, leaving the voice channel.`, color: Colors.Green }] });
    }
}