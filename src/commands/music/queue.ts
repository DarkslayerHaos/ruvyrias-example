import { Message, EmbedBuilder } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseCommand } from '../../structures/BaseCommand';
import { Player } from 'ruvyrias';

export default class Queue extends BaseCommand {
    private constructor() {
        super({
            name: 'queue',
            aliases: ['q']
        });
    }

    public execute(client: BaseClient, message: Message, player: Player, args: string[]): void {
        if (!this.checkPlayerState(message, player)) return;
        if (!message.guild?.members.me?.permissions.has('SendMessages')) return;
        if (!message.guild?.members.me?.permissionsIn(message.channelId).has('SendMessages')) return;

        const queue = player.queue;
        const embed = new EmbedBuilder().setColor('#000001').setAuthor({ name: `Queue for ${message.guild?.name}` });

        const multiple = 10;
        const page = args.length && Number(args[0]) ? Number(args[0]) : 1;

        const end = page * multiple;
        const start = end - multiple;

        const tracks = queue.slice(start, end);

        if (player.currentTrack) embed.addFields({ name: `🎶 Playing now`, value: `[${player.currentTrack.info.title}](${player.currentTrack.info.uri})` });

        if (!tracks.length) {
            embed.setDescription(`No tracks ${page > 1 ? `pages ${page}` : `in the queue`}.`);
        } else {
            embed.setDescription(tracks.map((track, i) => `${start + (++i)} - [${track.info.title}](${track.info.uri})`).join('\n'));
        }
        const maxPages = Math.ceil(queue.length / multiple);
        embed.setFooter({ text: `Pages ${page > maxPages ? maxPages : page} of ${maxPages} ` });
        embed.setThumbnail(message.guild?.iconURL({ size: 4096 }));
        embed.setColor('Purple')

        message.reply({ embeds: [embed] });
    }
}