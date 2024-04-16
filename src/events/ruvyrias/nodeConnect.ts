import { Node } from 'ruvyrias';
import { BaseClient } from '../../structures/BaseClient';
import { BaseEvent } from '../../structures/BaseEvent';

export default class NodeConnect extends BaseEvent {
    public execute(client: BaseClient, node: Node): void {
        console.log(`[+] Lavalink ${node.options.name} successfully connected.`)
    }
}