import { version } from './package.json'
const action = (name) => `${version}:ACTION_${name}`

export const ACTION_IRC_SAY = action('IRC_SAY')
export const ACTION_IRC_CLIENT_EVENT = action('IRC_CLIENT_EVENT')

export const ACTION_REQUEST_CONSUMER_IDENT = action('REQUEST_CONSUMER_IDENT')
export const ACTION_RECEIVE_CONSUMER_IDENT = action('RECEIVE_CONSUMER_IDENT')
export const ACTION_ERROR = action('ERROR')
