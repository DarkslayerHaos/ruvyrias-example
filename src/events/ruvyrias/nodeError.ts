import { Node } from 'ruvyrias';
import { BaseClient } from '../../structures/BaseClient';
import { BaseEvent } from '../../structures/BaseEvent';

export default class NodeError extends BaseEvent {
    public execute(client: BaseClient, node: Node, error: Error): void {
        console.log(`[+] Node ${node.options.name} errored: ${error.message}.`)
    }
}