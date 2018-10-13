import { AUTH_USER, UNAUTH_USER, CHANGE_PASS, RESET_DB } from "./types";
import { authAPIAction, APIAction, payload } from "./utilities";

export function logout() {
  return dispatch => {
    localStorage.removeItem("token");
    let action = { type: UNAUTH_USER };
    dispatch(Object.assign(action, payload.success()));
    action = { type: UNSET_USER };
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

export function changePassword({ oldPassword, newPassword }) {
  return authAPIAction({
    type: CHANGE_PASS,
    url: "/password",
    opts: {
      method: "post",
      body: JSON.stringify({ oldPassword, newPassword }),
      headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
    },
    formatData: ({ success, message }) => {
      return ({ success, message });
    }
  });
}

export function resetDatabase() {
  console.log('asdf');
  return authAPIAction({
    type: RESET_DB,
    url: "/reset",
    opts: {
      method: "post",
      headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
    },
    formatData: ({ success, message }) => {
      return ({ success, message });
    }
  });
}
