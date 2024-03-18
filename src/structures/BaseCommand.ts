import { Client, Colors, Message, VoiceState } from 'discord.js';
import { Player } from 'ruvyrias';

interface ICommand {
    name: string,
    aliases: string[],
}

/**
 * Abstract class for creating base commands.
 */
export abstract class BaseCommand {
    public readonly name: string;
    public readonly aliases: string[]

    /**
     * Constructor for BaseCommand class.
     * @param params An object containing the name and aliases of the command.
     */
    public constructor(params: Omit<ICommand, 'execute'>) {
        this.name = params.name;
        this.aliases = params.aliases;
    }

    /**
     * Execute method to be implemented by child classes.
     * @param client The Discord client.
     * @param message The message instance.
     * @param args Command arguments.
     * @param player The Player instance.
     */
    public abstract execute(client: Client, message: Message, player?: Player, args?: string[]): void;

    /**
     * Checks the state of the player and the user's voice channel.
     * @param message The message instance.
     * @param player The Ruvyrias player instance.
     */
    public checkPlayerState(message: Message, player: Player): boolean {
        if (!player) {
            message.reply({ embeds: [{ description: `❌ The server doesn't have any active players.`, color: Colors.Red }] });
            return false;
        }

        const { channel } = message.member?.voice as VoiceState;
        if (!channel) {
            message.reply({ embeds: [{ description: `❌ You need to join a voice channel.`, color: Colors.Red }] });
            return false;
        }

        if (channel.id !== player.voiceChannel) {
            message.reply({ embeds: [{ description: `❌ We are not in the same voice channel.`, color: Colors.Red }] });
            return false;
        }

        return true;
    }
}