import { INIT_INFO, INIT_SERVER_INFO } from "./types";
import { APIAction } from "./utilities";

export function initInfo() {
  return dispatch => {
    APIAction({
      type: INIT_INFO,
      url: "/data/info.json",
      opts: { method: "get" },
      formatData: data => { return ({ success: true, content: data }); }
    })(dispatch);
    APIAction({
      type: INIT_SERVER_INFO,
      url: "/registration_status",
      opts: { method: "get" },
      formatData: data => { return ({ success: true, content: data }); }
    })(dispatch);
  }
}
