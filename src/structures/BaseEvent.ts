import { Client } from 'discord.js';
import { BaseClient } from './BaseClient';

/**
 * Abstract class for creating base events.
 */
export abstract class BaseEvent {
    /**
     * Execute method to be implemented by child classes.
     * @param client The Discord client.
     * @param props Additional properties.
     * @param props2 Additional properties.
     */
    public abstract execute(client: Client | BaseClient, props?: any, props2?: any): void
}