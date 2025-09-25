import { CustomClient } from '../../structures/CustomClient';
import { BaseEvent } from '../../structures/Event';
import { Player, Track } from 'ruvyrias';

export default class QueueEnd extends BaseEvent {
    public async execute(client: CustomClient, player: Player, track: Track): Promise<void> {
        client.logger.info(`Added the track ${track.info.title} to guild ${player.guildId}`);
    }
}