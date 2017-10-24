import {
  AUTH_USER,
  UNAUTH_USER,
  CHANGE_PASS,
  requestStatuses
} from "../actions/types";

const { SUCCESS, ERROR, IDLE, PENDING } = requestStatuses;

const INITIAL_STATE = {
  authenticated: { requestStatus: IDLE, message: '', content: false },
  changePassword: { requestStatus: IDLE, message: '' }
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
    default:
      return state;
  }
}
