import { ApplicationCommandOption, ChatInputCommandInteraction, Client, Colors, GuildMember, PermissionResolvable } from 'discord.js';
import { Player } from 'ruvyrias';

/**
 * Type representing the details of a command.
 */
export type CommandType = {
    name: string;
    description: string;
    category: string;
    options?: ApplicationCommandOption[];
    permissions: {
        client: PermissionResolvable[];
        user: PermissionResolvable[];
    };
}

/**
 * Abstract class for creating commands.
 */
export abstract class Command {
    public readonly name: string;
    public readonly description: string;
    public readonly category: string;
    public readonly options: ApplicationCommandOption[];
    public readonly permissions: {
        client: PermissionResolvable[];
        user: PermissionResolvable[];
    };

    /**
     * Constructor for Command class.
     * @param params An object containing the name and aliases of the command.
     */
    public constructor(params: Omit<CommandType, 'execute'>) {
        this.name = params.name;
        this.description = params.description;
        this.category = params.category;
        this.options = params.options ?? [];
        this.permissions = {
            client: params.permissions?.client ?? ['SendMessages', 'ViewChannel', 'EmbedLinks'],
            user: params.permissions?.user ?? ['SendMessages', 'ViewChannel'],
        };

    }

    /**
     * Execute method to be implemented by child classes.
     * @param client The Discord client.
     * @param interaction The interaction instance.
     * @param player The Player instance.
     */
    public abstract execute(client: Client, interaction: ChatInputCommandInteraction, player?: Player): void;

    /**
     * Checks the state of the player and the user's voice channel.
     * @param interaction The message instance.
     * @param player The Ruvyrias player instance.
     */
    public async checkPlayerState(interaction: ChatInputCommandInteraction, player: Player): Promise<boolean> {
        if (!player) {
            await interaction.editReply({ embeds: [{ description: `❌ The server doesn't have any active players.`, color: Colors.Red }] });
            return false;
        }

        const { channel } = (interaction.member as GuildMember).voice;
        if (!channel) {
            await interaction.editReply({ embeds: [{ description: `❌ You need to join a voice channel.`, color: Colors.Red }] });
            return false;
        }

        if (channel.id !== player.voiceChannelId) {
            await interaction.editReply({ embeds: [{ description: `❌ We are not in the same voice channel.`, color: Colors.Red }] });
            return false;
        }

        return true;
    }

    /**
     * Checks the permissions of client and user.
     * @param interaction The interaction instance.
     */
    public async checkPermissions(interaction: ChatInputCommandInteraction): Promise<boolean> {
        await interaction.deferReply();

        const missingClientPermissions = this.permissions?.client?.filter(p => p !== 'SendMessages').join(', ');
        const missingUserPermissions = this.permissions?.user?.filter(p => p !== 'SendMessages').join(', ');

        if (!interaction.guild?.members.me?.permissions.has(this.permissions.client)) {
            const clientPermissionsMessage = `❌ I don't have the following **permissions**: \`${missingClientPermissions}\` to run the command!`;
            await interaction.editReply({ embeds: [{ description: clientPermissionsMessage, color: Colors.Red }] });
            return false;
        }

        if (!(interaction.member as GuildMember).permissions.has(this.permissions.user)) {
            const userPermissionsMessage = `❌ You don't have the following **permissions**: \`${missingUserPermissions}\` to run the command!`;
            interaction.editReply({ embeds: [{ description: userPermissionsMessage, color: Colors.Red }] });
            return false;
        }

        return true;
    }
}