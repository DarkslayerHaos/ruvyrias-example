import { CustomClient } from './CustomClient';
import { REST, Routes } from 'discord.js';
import { RuvyriasEvent } from 'ruvyrias';
import { Command } from './Command';
import { readdirSync } from 'fs';
import path from 'path';

export class BaseLoader {
    /**
     * Load client events dynamically.
     * @param client The base client instance.
     */
    public static async loadClientEvents(client: CustomClient): Promise<void> {
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
    public static async loadRuvyriasEvents(client: CustomClient): Promise<void> {
        const events = readdirSync('src/events/ruvyrias');

        for (const files of events) {
            const eventFile = await import(`../events/ruvyrias/${files}`);
            const Event = new eventFile.default(files.split('.')[0]);
            const fileName = files.split('.')[0];
            const eventKey = fileName as keyof typeof RuvyriasEvent;
            client.manager.on(RuvyriasEvent[eventKey], Event.execute.bind(Event, client));
        }
    }

    /**
     * Load commands dynamically.
     * @param client The base client instance.
     */
    public static async loadCommands(client: CustomClient): Promise<void> {
        const commandList = [];

        const folders = readdirSync(path.join(__dirname, '../commands/'));

        for (const folder of folders) {
            const files = readdirSync(path.join(__dirname, '../commands/', folder));
            for (const file of files) {
                if (file.endsWith('.ts') || file.endsWith('.js')) {
                    const commandFile = await import(path.join(__dirname, '../commands/', folder, file));
                    const Command: Command = new commandFile.default();
                    client.commands.set(Command.name, Command);

                    commandList.push({
                        name: Command.name,
                        description: Command.description,
                        type: '1',
                        options: Command.options,
                    });
                }
            }
        }

        const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN as string);
        (async () => {
            try {
                client.logger.info('Initializing commands registration...');

                await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!), { body: commandList });
                client.logger.success('Successfully registered commands. ');
            } catch (err) {
                console.error(err);
            }
        })();

        client.logger.complete('Client commands loaded.');
    }
}