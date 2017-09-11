export const requestStatuses = {
  SUCCESS: 'success',
  PENDING: 'pending',
  IDLE: 'idle',
  ERROR: 'error'
};

export const INIT_INFO = 'init_info'; // retrieve info.json

export const AUTH_USER = 'auth_user', // authenticate user
             UNAUTH_USER = 'unauth_user'; // unauthenticate user

export const USER_GET = 'user_get', // get user info
             USER_TEAM_POST = 'user_team_post', // post a new team
             USER_TEAM_PUT = 'user_team_put', // update a team
             USER_TEAM_DELETE = 'user_team_delete'; // delete a team
