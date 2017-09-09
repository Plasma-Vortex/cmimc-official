import { requestStatuses } from "./types";

export const payload = {
  success: (state = {}) => ({
    payload: {
      requestStatus: requestStatuses.SUCCESS,
      ...state
    }
  }),
  error: errorMessage => ({
    payload: {
      requestStatus: requestStatuses.ERROR,
      message: errorMessage
    }
  }),
  idle: () => ({ payload: { requestStatus: requestStatuses.IDLE } }),
  pending: () => ({ payload: { requestStatus: requestStatuses.PENDING } })
}

export function APIAction({ type, url, opts, formatData }) {
  let action = { type };
  return dispatch => {
    dispatch(Object.assign(action, payload.pending()));
    fetch(url, opts).then(
      res => res.json().then(data => {
        const { success, message, content } = formatData(data);
        if (!success) dispatch(Object.assign(action, payload.error(message)));
        else dispatch(Object.assign(action, payload.success({ content })));
      }),
      err => {
        const message = err.message || "Failed to communicate with server.";
        dispatch(Object.assign(action, payload.error(message)));
      }
    );
  }
}
