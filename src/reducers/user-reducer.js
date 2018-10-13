import $ from "jquery";

import {
  USER_GET,
  USER_TEAM_POST,
  USER_TEAM_PUT,
  USER_TEAM_DELETE,
  RESET_USER,
  requestStatuses } from "../actions/types";

const { SUCCESS, ERROR, IDLE, PENDING } = requestStatuses;

const INITIAL_STATE = {
  user: { requestStatus: IDLE, message: '', content: null },
  postTeam: { requestStatus: IDLE, message: '' },
  putTeam: { requestStatus: IDLE, message: '' },
  deleteTeam: { requestStatus: IDLE, message: '' }
};

export default function (state = INITIAL_STATE, { type, payload }) {
  const { requestStatus, message, content } = payload || {};
  let newState;
  switch (type) {
    case RESET_USER:
      return INITIAL_STATE;
    case USER_GET:
      return { ...state, user: payload };
    case USER_TEAM_DELETE:
      if (requestStatus !== SUCCESS) return {
        ...state,
        user: Object.assign({}, state.user, { requestStatus, message }),
        deleteTeam: { requestStatus, message }
      };
      newState = {
        ...state,
        user: {
          requestStatus,
          message,
          content: Object.assign({}, state.user.content)
        },
        deleteTeam: { requestStatus, message }
      };
      newState.user.content.teams = newState.user.content.teams.filter(
        oldTeam => oldTeam._id !== content // content is team_id
      );
      return newState;
    case USER_TEAM_PUT:
      if (requestStatus !== SUCCESS) return {
        ...state,
        user: Object.assign({}, state.user, { requestStatus, message }),
        putTeam: { requestStatus, message }
      };
      newState = {
        ...state,
        user: {
          requestStatus,
          message,
          content: Object.assign({}, state.user.content)
        },
        putTeam: { requestStatus, message }
      };
      newState.user.content.teams = newState.user.content.teams.map(
        oldTeam => oldTeam._id === content._id ? content : oldTeam
      );
      return newState;
    case USER_TEAM_POST:
      if (requestStatus !== SUCCESS) return {
        ...state,
        user: Object.assign({}, state.user, { requestStatus, message }),
        postTeam: { requestStatus, message }
      };
      return {
        ...state,
        user: {
          requestStatus,
          message,
          content: Object.assign({}, state.user.content, {
            teams: state.user.content.teams.concat(content)
          })
        },
        postTeam: { requestStatus, message }
      };
    default:
      return state;
  }
}
