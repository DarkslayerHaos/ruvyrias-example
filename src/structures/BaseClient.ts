import { config } from 'dotenv'; config({ path: 'src/settings/.env' });
import { Client, Collection } from 'discord.js';
import { BaseCommand } from './BaseCommand';
import { BaseLoader } from './BaseLoader';
import { Ruvyrias } from 'ruvyrias';
import { options, nodes, data } from '../settings/config';

/**
 * Customized Discord Client class extending Discord.js Client.
 */
export class BaseClient extends Client {
    public readonly commands: Collection<string, BaseCommand>;
    public readonly aliases: Collection<string, BaseCommand>;
    public readonly manager: Ruvyrias;

    /**
     * Constructs a new BaseClient instance.
     * Initializes command and alias collections, and sets up Ruvyrias manager and event/command loading.
     */
    public constructor() {
        super(options);
        this.commands = new Collection();
        this.aliases = new Collection();
        this.manager = new Ruvyrias(this, nodes, data);
        BaseLoader.loadClientEvents(this);
        BaseLoader.loadRuvyriasEvents(this);
        BaseLoader.loadCommands(this);
    }

    /**
     * Connects the bot to Discord.
     */
    public connect(): void {
        super.login(process.env.TOKEN as string);
    }
}