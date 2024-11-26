import { Session, UserNoSensitiveWithRelations } from '../models'




export type UserMetadata = {
  client_ip: string | undefined,
  language: string | undefined,
  user_agent: string | undefined
}

export type CurrentUser = UserNoSensitiveWithRelations & Pick<Session, 'session_id'>
