import { CustomClient } from '../../structures/CustomClient';
import { BaseEvent } from '../../structures/Event';
import { Node } from 'ruvyrias';

export default class NodeError extends BaseEvent {
    public execute(client: CustomClient, node: Node, error: Error): void {
        console.log(`[+] Node ${node.options.name} errored: ${error.message}.`);
    }
}