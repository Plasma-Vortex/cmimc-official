import { AUTH_USER, UNAUTH_USER } from "./types";
import { APIAction, payload } from "./utilities";

export function logout(dispatch) {
  localStorage.removeItem('token');
  let action = { type: UNAUTH_USER };
  dispatch(Object.assign(action, payload.success()));
}

export function login({ email, password }) {
  return APIAction({
    type: AUTH_USER,
    url: "/login",
    opts: { 
      method: "post",
      body: JSON.stringify({ email, password }),
      header: { "Content-Type": "application/json" }
    },
    formatData: ({ success, message, token }) => {
      if (success) localStorage.setItem('token', token);
      return ({ success, message, content: true });
    }
  });
}
