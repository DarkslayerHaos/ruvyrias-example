import { CustomClient } from '../../structures/CustomClient';
import { BaseEvent } from '../../structures/Event';
import { Node } from 'ruvyrias';

export default class NodeConnect extends BaseEvent {
    public execute(client: CustomClient, node: Node): void {
        client.logger.info(`Lavalink ${node.options.name} successfully connected.`);
    }
}