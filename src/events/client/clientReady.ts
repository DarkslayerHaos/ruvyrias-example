import { CustomClient } from '../../structures/CustomClient';
import { BaseEvent } from '../../structures/Event';
import { ActivityType } from 'discord.js';

export default class Ready extends BaseEvent {
    public async execute(client: CustomClient) {
        client.user?.setActivity(`/play`, { type: ActivityType.Listening });
        //Starting the Ruvyrias client
        await client.manager.init(client);
    }
}