import { INIT_INFO } from "./types";
import { APIAction } from "./utilities";

export function initInfo() {
  return APIAction({
    type: INIT_INFO,
    url: "/data/info.json",
    opts: { method: "get" },
    formatData: data => { return ({ success: true, content: data }); }
  });
}
