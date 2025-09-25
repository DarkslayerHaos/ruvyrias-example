import { SignaleOptions } from 'signale';

/**
 * Configuration options for the logger using Signale.
 */
export const LoggerOptions: SignaleOptions = {
    disabled: false,
    interactive: false,
    scope: 'Example Bot',
    config: {
        displayScope: true,
        displayBadge: true,
        displayDate: true,
        displayLabel: true,
        underlineLabel: true
    },
    types: {
        success: {
            badge: '[√]',
            label: 'Success',
            color: 'green'
        },
        complete: {
            badge: '[×]',
            label: 'Complete',
            color: 'blue'
        },
        info: {
            badge: '[i]',
            label: 'Info',
            color: 'blue'
        },
        error: {
            badge: '[×]',
            label: 'Error',
            color: 'red'
        },
        warn: {
            badge: '[‼]',
            label: 'Warning',
            color: 'yellow'
        }
    }
}