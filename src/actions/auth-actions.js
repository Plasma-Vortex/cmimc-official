import { AUTH_USER, UNAUTH_USER } from "./types";
import { APIAction, payload } from "./utilities";

export function logout() {
  return dispatch => {
    localStorage.removeItem("token");
    let action = { type: UNAUTH_USER };
    dispatch(Object.assign(action, payload.success()));
  }
}

export function login({ email, password, history }) {
  return APIAction({
    type: AUTH_USER,
    url: "/login",
    opts: { 
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" }
    },
    formatData: ({ success, message, token }) => {
      if (success) {
        localStorage.setItem("token", token);
        history.push("/account");
      }
      return ({ success, message, content: true });
    }
  });
}

export function signup({ email, password, history }) {
  return APIAction({
    type: AUTH_USER,
    url: "/signup",
    opts: { 
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" }
    },
    formatData: ({ success, message, token }) => {
      if (success) {
        localStorage.setItem("token", token);
        history.push("/account");
      }
      return ({ success, message, content: true });
    }
  });
}

