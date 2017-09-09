import { AUTH_USER, UNAUTH_USER, requestStatuses } from "../actions/types";

const { SUCCESS, ERROR, IDLE, PENDING } = requestStatuses;

const INITIAL_STATE = {
  authenticated: { requestStatus: IDLE, message: '', content: false }
};

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case AUTH_USER:
    case UNAUTH_USER:
      return { ...state, authenticated: payload };
    default:
      return state;
  }
}
