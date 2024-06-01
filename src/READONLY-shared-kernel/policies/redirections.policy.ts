export const APPLICATION_REDIRECTIONS = [
  'ALREADY_LOGGED_ROUTE',
  'UNAUTHORIZED_ROUTE'
] as const

export type APPLICATION_REDIRECTIONS_TYPE = typeof APPLICATION_REDIRECTIONS[number]


export type REDIRECTIONS_POLICY_TYPE = {
  redirections: Record<string, APPLICATION_REDIRECTIONS_TYPE>
  routes: Record<APPLICATION_REDIRECTIONS_TYPE, string>        // @todo zrobić z tego stringa otypowane, faktyczne routy
}

export const REDIRECTIONS_POLICY: REDIRECTIONS_POLICY_TYPE = {

  redirections: {
    REDIRECTION_FROM_LOGIN_FORM_TO_ALREADY_LOGGED: 'ALREADY_LOGGED_ROUTE',
    REDIRECTION_FROM_UNAUTHORIZED                : 'UNAUTHORIZED_ROUTE'
  },

  routes: {
    ALREADY_LOGGED_ROUTE: '/',
    UNAUTHORIZED_ROUTE: '/login',

  }

}
