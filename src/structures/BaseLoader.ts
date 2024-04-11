import { RuvyriasEvents } from 'ruvyrias/dist/src/Ruvyrias';
import { BaseClient } from './BaseClient';
import { readdirSync } from 'fs';

export class BaseLoader {
    /**
     * Load client events dynamically.
     * @param client The base client instance.
     */
    public static async loadClientEvents(client: BaseClient): Promise<void> {
        const events = readdirSync('src/events/client');

        for (const files of events) {
            const eventFile = await import(`../events/client/${files}`);
            const Event = new eventFile.default(files.split('.')[0]);

            client.on(files.split('.')[0], Event.execute.bind(events, client));
        }
    }

    /**
     * Load Ruvyrias events dynamically.
     * @param client The base client instance.
     */
    public static async loadRuvyriasEvents(client: BaseClient): Promise<void> {
        const events = readdirSync('src/events/ruvyrias');

        for (const files of events) {
            const eventFile = await import(`../events/ruvyrias/${files}`);
            const Event = new eventFile.default(files.split('.')[0]);

            client.manager.on(files.split('.')[0] as string as keyof RuvyriasEvents, Event.execute.bind(events, client));
        }
    }

    /**
     * Load commands dynamically.
     * @param client The base client instance.
     */
    public static async loadCommands(client: BaseClient): Promise<void> {
        const commands = readdirSync('src/commands/');

        for (const folder of commands) {
            const files = readdirSync(`src/commands/${folder}`);
            for (const file of files) {
                const commandFile = await import(`../commands/${folder}/${file}`);
                const Command = new commandFile.default();

                client.commands.set(Command.name, Command);
                for (const alias of Command.aliases) {
                    client.aliases.set(alias, Command);
                }
            }
        }
    }
}