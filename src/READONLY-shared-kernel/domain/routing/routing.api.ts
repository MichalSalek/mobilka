import { PERMISSIONS_POLICY }              from '../../policies/permissions.policy'
import { CRITICAL_REDIRECTIONS_ON_EVENTS } from './routing.config'
import { RedirectionHandler }              from './routing.types'




export const criticalRedirectionsSwitch: RedirectionHandler = (event, action, currentUser, currentPathname) => {

  switch (event) {
    case 'ALREADY_LOGGED': {
      if (!PERMISSIONS_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_ROUTE(
        currentUser?.role,
        currentPathname)) {
        action(CRITICAL_REDIRECTIONS_ON_EVENTS.ALREADY_LOGGED)
      }
      break
    }
    case 'LOGIN_FIRST': {
      if (!PERMISSIONS_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_ROUTE(
        currentUser?.role,
        currentPathname)) {
        action(CRITICAL_REDIRECTIONS_ON_EVENTS.LOGIN_FIRST)
      }
      break
    }
    case 'UNAUTHORIZED': {
      action(CRITICAL_REDIRECTIONS_ON_EVENTS.UNAUTHORIZED)
      break
    }
    case 'SESSION_EXPIRED': {
      action(CRITICAL_REDIRECTIONS_ON_EVENTS.SESSION_EXPIRED)
      break
    }
  }
}