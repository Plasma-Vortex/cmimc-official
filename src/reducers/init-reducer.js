import { INIT_INFO, INIT_SERVER_INFO, requestStatuses } from "../actions/types";

const { SUCCESS, ERROR, IDLE, PENDING } = requestStatuses;

const INITIAL_STATE = {
  info: { requestStatus: IDLE, message: '', content: {} },
  server_info: { requestStatus: IDLE, message: '', content: {} }
};

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case INIT_INFO:
      return { ...state, info: payload };
    case INIT_SERVER_INFO:
      return { ...state, server_info: payload };
    default:
      return state;
  }
}
