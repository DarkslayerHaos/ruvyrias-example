import { Player, Track } from 'ruvyrias';
import { BaseClient } from '../../structures/BaseClient';
import { BaseEvent } from '../../structures/BaseEvent';

export default class TrackEnd extends BaseEvent {
    public async execute(client: BaseClient, player: Player, track: Track): Promise<void> {
        // Just running autoplay at this time
        if (player.isAutoPlay) {
            await player.autoplay(player);
        }
    }
}