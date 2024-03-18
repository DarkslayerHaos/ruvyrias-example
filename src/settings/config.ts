import { ClientOptions, GatewayIntentBits } from 'discord.js';
import { NodeGroup, RuvyriasOptions, Deezer } from 'ruvyrias';
const deezer = new Deezer();

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
        password: 'youshallnotpass',
        secure: false,
    },
];

/**
 * Options for Ruvyrias, the music client.
 */
export const data: RuvyriasOptions = {
    library: 'discord.js',
    defaultPlatform: 'ytsearch',
    plugins: [deezer],
    reconnectTries: Infinity,
    reconnectTimeout: 1000 * 10,
};