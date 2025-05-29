import { EVENT_COMMANDS_AND_QUERIES_TYPE } from '../commands-and-queries/cqrs.types'




export type PermissionsCollection = EVENT_COMMANDS_AND_QUERIES_TYPE[]

export type PermissionSets = Record<string, EVENT_COMMANDS_AND_QUERIES_TYPE[]>
