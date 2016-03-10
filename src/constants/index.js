
export const CMD_SAY = 'V1_COMMAND_SAY'


export const CMD_CLIENT_EVENT = 'V1_CLIENT_EVENT'
export const ALL_CLIENT_EVENTS = new Set([
  'message',
  'error',
  'registered',
  'motd',
  'names',
  'topic',
  'join',
  'part',
  'quit',
  'kick',
  'kill',
  'notice',
  'ping',
  'pm',
  'ctcp',
  'nick',
  'invite',
  '+mode',
  '-mode',
  'whois',
  'channellist_start',
  'channellist_item',
  'channellist',
  'action',
])
