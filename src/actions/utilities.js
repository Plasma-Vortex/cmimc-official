import { requestStatuses } from "./types";
import auth from "../auth";

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

export function authAPIAction({ type, url, opts, formatData }) {
  let action = { type };
  return dispatch => {
    if (!auth.isLoggedIn()) 
      dispatch(Object.assign(action, payload.error("User is not logged in.")));
    else return APIAction({ type, url, opts, formatData })(dispatch);
  }
}

