import {
  AUTH_USER,
  UNAUTH_USER,
  CHANGE_PASS,
  RESET_DB,
  requestStatuses
} from "../actions/types";

const { SUCCESS, ERROR, IDLE, PENDING } = requestStatuses;

const INITIAL_STATE = {
  authenticated: { requestStatus: IDLE, message: '', content: false, admin: false },
  changePassword: { requestStatus: IDLE, message: '' },
  resetDB: { requestStatus: IDLE, message: '' }
};

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case UNAUTH_USER:
      return { ...state, authenticated: payload };
    case AUTH_USER:
      return {
        ...state,
        authenticated: Object.assign({}, state.authenticated, payload)
      };
    case CHANGE_PASS:
      return { ...state, changePassword: payload };
    case RESET_DB:
      return { ...state, resetDB: payload };
    default:
      return state;
  }
}
