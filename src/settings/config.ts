import { NodeGroup, RuvyriasOptions, Plugin, LibrariesType, PlatformsType } from 'ruvyrias';
import { ClientOptions, GatewayIntentBits } from 'discord.js';

/**
 * Options for configuring the Discord bot client.
 */
export const options: ClientOptions = {
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ],
    allowedMentions: { parse: ['users'] }
};

/**
 * Configuration for Lavalink nodes.
 */
export const nodes: NodeGroup[] = [
    {
        name: 'main',
        host: 'localhost',
        port: 80,
        auth: 'youshallnotpass',
        secure: false,
    }
];

/**
 * Options for Ruvyrias, the music client.
 */
export const data: RuvyriasOptions = {
    library: LibrariesType.DiscordJS,
    defaultPlatform: PlatformsType.YtSearch,
    plugins: [new Plugin.Deezer()],
    autoResume: true,
    retryAmount: Infinity,
    retryDelay: 1000 * 10,
};