import { config } from 'dotenv'; config({ path: 'src/settings/.env' });
import { options, nodes, data } from '../settings/config';
import { LoggerOptions } from '../settings/signale';
import { Client, Collection } from 'discord.js';
import { BaseLoader } from './Loader';
import { Command } from './Command';
import { Ruvyrias } from 'ruvyrias';
import { Signale } from 'signale';
console.clear();

/**
 * Customized Discord Client class extending Discord.js Client.
 */
export class CustomClient extends Client {
    public readonly commands: Collection<string, Command>;
    public readonly logger: Signale;
    public readonly manager: Ruvyrias;

    /**
     * Constructs a new CustomClient instance.
     * Initializes command and alias collections, and sets up Ruvyrias manager and event/command loading.
     */
    public constructor() {
        super(options);
        this.commands = new Collection();
        this.logger = new Signale(LoggerOptions);
        this.manager = new Ruvyrias(this, nodes, data);
        BaseLoader.loadClientEvents(this);
        BaseLoader.loadRuvyriasEvents(this);
        BaseLoader.loadCommands(this);
    }

    /**
     * Connects the bot to Discord.
     */
    public connect(): void {
        if (!process.env.CLIENT_TOKEN) {
            this.logger.error('The client token was not provided.');
            process.exit();
        }

        super.login(process.env.CLIENT_TOKEN);
    }
}