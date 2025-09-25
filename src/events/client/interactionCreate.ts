import { ChannelType, ChatInputCommandInteraction, InteractionResponse } from 'discord.js';
import { CustomClient } from '../../structures/CustomClient';
import { Player } from 'ruvyrias';


export default class extends Event {
    /**
     * Executed when an interaction (command) is created.
     * @param client - The bot's client.
     * @param interaction - The created interaction.
     */
    public async execute(client: CustomClient, interaction: ChatInputCommandInteraction): Promise<InteractionResponse | void> {
        if (interaction.channel?.type === ChannelType.DM) return;

        const { commandName } = interaction;

        try {
            const player = client.manager.get(interaction.guild?.id as string) as Player;
            client.commands.get(commandName)?.execute(client, interaction, player);
        } catch (err) {
            client.logger.error(`Error at command: ${commandName}`);
            console.error(err);
        }
    }
}