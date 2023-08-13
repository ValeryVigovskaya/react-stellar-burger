import {
  SET_AUTH_CHECKED, SET_USER, PATCH_USER_REQUEST, PATCH_USER_SUCCESS,
  PATCH_USER_FAILED,
  POST_SIGNIN_REQUEST, POST_SIGNIN_SUCCES, POST_SIGNIN_FAILED,
  POST_REGISTER_REQUEST, POST_REGISTER_SUCCESS, POST_REGISTER_FAILED,
  POST_SIGNOUT_REQUEST, POST_SIGNOUT_SUCCESS, POST_SIGNOUT_FAILED,
  TUserActions
} from '../actions/actions-user';
import { IUser } from "../../utils/types";

export type TUserState = {
  isAuthChecked: boolean,
  user: IUser | null,
  patchRequest: boolean,
  patchFailed: boolean,
  signinRequest: boolean,
  signinFailed: boolean,
  signoutRequest: boolean,
  signoutFailed: boolean,
  registerRequest: boolean,
  registerFailed: boolean,
};

const initialState: TUserState = {
  isAuthChecked: false,
  user: null,
  patchRequest: false,
  patchFailed: false,
  signinRequest: false,
  signinFailed: false,
  signoutRequest: false,
  signoutFailed: false,
  registerRequest: false,
  registerFailed: false,
};

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
  switch (action.type) {
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload
      }
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case PATCH_USER_REQUEST: {
      return {
        ...state,
        patchRequest: true,
        patchFailed: false,
      };
    }
    case PATCH_USER_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          name: action.user.name,
          email: action.user.email,
          password: action.user.password
        },
        patchRequest: false,
        isAuthChecked: true
      };
    }
    case PATCH_USER_FAILED: {
      return {
        ...state,
        patchFailed: true,
        patchRequest: false
      };
    }

    case POST_REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        registerFailed: false,
      };
    }
    case POST_REGISTER_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          name: action.user.name,
          email: action.user.email,
          password: action.user.password
        },
        registerRequest: false,
        isAuthChecked: true
      };
    }
    case POST_REGISTER_FAILED: {
      return {
        ...state,
        registerFailed: true,
        registerRequest: false
      };
    }
    case POST_SIGNIN_REQUEST: {
      return {
        ...state,
        signinRequest: true,
        signinFailed: false,
      }
    }
    case POST_SIGNIN_SUCCES: {
      return {
        ...state,
        signinRequest: false,
        user: {
          ...state.user,
          name: action.user.name,
          email: action.user.email,
          password: action.user.password
        },
        isAuthChecked: true,
      }
    }
    case POST_SIGNIN_FAILED: {
      return {
        ...state,
        signinRequest: false,
        signinFailed: true,
      }
    }
    case POST_SIGNOUT_REQUEST: {
      return {
        ...state,
        signoutRequest: true,
        signoutFailed: false,

      }
    }
    case POST_SIGNOUT_SUCCESS: {
      return {
        ...state,
        signoutRequest: false,
        signoutFailed: true,
      }
    }
    case POST_SIGNOUT_FAILED: {
      return {
        ...state,
        signoutRequest: false,
        signoutFailed: true,
      }
    }

    default:
      return state;
  }
};