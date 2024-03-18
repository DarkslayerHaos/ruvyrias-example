import { ActivityType } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseEvent } from '../../structures/BaseEvent';

export default class Ready extends BaseEvent {
    public execute(client: BaseClient) {
        client.user?.setActivity(`${process.env.PREFIX as string}play`, { type: ActivityType.Listening });
        //Starting the Ruvyrias client
        client.manager.init(client);

        console.clear();
        console.log(`[+] Connected as ${client.user?.tag}`);
    }
}