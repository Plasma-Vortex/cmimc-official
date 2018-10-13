export const requestStatuses = {
  SUCCESS: 'success',
  PENDING: 'pending',
  IDLE: 'idle',
  ERROR: 'error'
};

export const INIT_INFO = 'init_info', // retrieve info.json
             INIT_SERVER_INFO = 'init_server_info'; // retrieve server info

export const AUTH_USER = 'auth_user', // authenticate user
             UNAUTH_USER = 'unauth_user', // unauthenticate user
             CHANGE_PASS = 'change_pass', // change password
             RESET_DB = 'reset_db'; // reset database (admin only)

export const USER_GET = 'user_get', // get user info
             USER_TEAM_POST = 'user_team_post', // post a new team
             USER_TEAM_PUT = 'user_team_put', // update a team
             USER_TEAM_DELETE = 'user_team_delete', // delete a team
             RESET_USER = 'reset_user'; // reset user info
