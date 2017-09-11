import { 
  USER_GET, 
  USER_TEAM_POST, 
  USER_TEAM_PUT,
  USER_TEAM_DELETE
} from "./types";
import { authAPIAction, payload } from "./utilities";

export function userGet() {
  return authAPIAction({
    type: USER_GET,
    url: "/api/users",
    opts: { 
      method: "get",
      headers: { 
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    },
    formatData: ({ success, message, user }) => ({ success, message, content: user })
  });
}

export function teamPost(team) {
  return authAPIAction({
    type: USER_TEAM_POST,
    url: "/api/teams",
    opts: { 
      method: "post",
      body: JSON.stringify({ team }),
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    },
    formatData: ({ success, message, team }) => ({ success, message, content: team })
  });
}

export function teamPut(team) {
  return authAPIAction({
    type: USER_TEAM_POST,
    url: `/api/teams/${team._id}`,
    opts: { 
      method: "put",
      body: JSON.stringify({ team }),
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    },
    formatData: ({ success, message, team }) => ({ success, message, content: team })
  });
}

export function teamDelete(team) {
  return authAPIAction({
    type: USER_TEAM_DELETE,
    url: `/api/teams/${team._id}`,
    opts: { 
      method: "delete",
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    },
    formatData: ({ success, message, team_id }) => ({ success, message, content: team_id })
  });
}

