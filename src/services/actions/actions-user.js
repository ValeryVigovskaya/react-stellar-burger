import { array } from 'prop-types';
import { getUser, login, postMail, postRegister, logOut, refreshToken, patchUser, resetPass } from '../../api/api'

export const GET_USER_REQUEST = 'GET_DATA_REQUEST';
export const GET_USER_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_USER_FAILED = 'GET_DATA_FAILED';

export const PATCH_USER_REQUEST = 'PATCH_DATA_REQUEST';
export const PATCH_USER_SUCCESS = 'PATCH_DATA_SUCCESS';
export const PATCH_USER_FAILED = 'PATCH_DATA_FAILED';

export const POST_SIGNIN_REQUEST = 'POST_SIGNIN_REQUEST';
export const POST_SIGNIN_SUCCES = 'POST_SIGNIN_SUCCES';
export const POST_SIGNIN_FAILED = 'POST_SIGNIN_FAILED';

export const POST_SIGNOUT_REQUEST = 'POST_SIGNOUT_REQUEST';
export const POST_SIGNOUT_SUCCESS = 'POST_SIGNOUT_SUCCESST';
export const POST_SIGNOUT_FAILED = 'POST_SIGNOUT_FAILED';

export const POST_PASS_REQUEST = 'POST_PASS_REQUEST';
export const POST_PASS_SUCCESS = 'POST_PASS_SUCCESS';
export const POST_PASS_FAILED = 'POST_PASS_FAILED';

export const POST_RESET_REQUEST = 'POST_PASS_REQUEST';
export const POST_RESET_SUCCESS = 'POST_PASS_SUCCESS';
export const POST_RESET_FAILED = 'POST_PASS_FAILED';

export const POST_REGISTER_REQUEST = 'POST_REGISTER_REQUEST';
export const POST_REGISTER_SUCCESS = 'POST_REGISTER_SUCCESS';
export const POST_REGISTER_FAILED = 'POST_REGISTER_FAILED';

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";

export function postRegisterFetch(array) {
  // Воспользуемся первым аргументом из усилителя redux-thunk — dispatch
  return function (dispatch) {
    dispatch({
      type: POST_REGISTER_REQUEST
    })
    postRegister(array)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: POST_REGISTER_SUCCESS,
            user: setUser(res.user),
          })
        } else {
          // Если произошла ошибка, отправляем соответствующий экшен
          dispatch({
            type: POST_REGISTER_FAILED
          })
        }
      }).catch(err => {
        // Если сервер не вернул данных, также отправляем экшен об ошибке
        dispatch({
          type: POST_REGISTER_FAILED
        })
      })
  }
}

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const getUserFetch = () => {
  return function (dispatch) {
    return getUser()
      .then((res) => {
        dispatch(setUser(res.user))
      });
  }
};

export const patchUserFetch = (form) => {
  return function (dispatch) {
    dispatch({
      type: POST_SIGNIN_REQUEST
    })
    patchUser(form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: PATCH_USER_SUCCESS,
            user: res
          })
          dispatch(setUser(res.user));
        } else {
          // Если произошла ошибка, отправляем соответствующий экшен
          dispatch({
            type: PATCH_USER_FAILED
          })
        }
      }).catch(err => {
        // Если сервер не вернул данных, также отправляем экшен об ошибке
        dispatch({
          type: PATCH_USER_FAILED
        })

      });
  }
};



export const signIn = (form) => {
  return function (dispatch) {
    dispatch({
      type: POST_SIGNIN_REQUEST
    })
    login(form)
      .then(res => {
        if (res && res.success) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch({
            type: POST_SIGNIN_SUCCES,
            user: res
          })
          dispatch(setUser(res.user))
          dispatch(setAuthChecked(true));
        } else {
          // Если произошла ошибка, отправляем соответствующий экшен
          dispatch({
            type: POST_SIGNIN_FAILED
          })
        }
      }).catch(err => {
        // Если сервер не вернул данных, также отправляем экшен об ошибке
        dispatch({
          type: POST_SIGNIN_FAILED
        })
      })
  };
};

export const register = (form) => {
  return function (dispatch) {
    dispatch({
      type: POST_REGISTER_REQUEST
    })
    postRegister(form)
      .then(res => {
        if (res && res.success) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch({
            type: POST_REGISTER_SUCCESS,
            user: res,
          })
          dispatch(setUser(res.user))
        } else {
          // Если произошла ошибка, отправляем соответствующий экшен
          dispatch({
            type: POST_REGISTER_FAILED
          })
        }
      }).catch(err => {
        // Если сервер не вернул данных, также отправляем экшен об ошибке
        dispatch({
          type: POST_REGISTER_FAILED
        })
      })
  }
}

export const userAuth = () => {
  return function (dispatch) {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUserFetch())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};


export const signOut = () => {
  return function (dispatch) {
    dispatch({
      type: POST_SIGNOUT_REQUEST
    })
    logOut()
      .then(res => {
        if (res && res.success) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch({
            type: POST_SIGNOUT_SUCCESS,
          })
          dispatch(setUser(null))
        } else {
          // Если произошла ошибка, отправляем соответствующий экшен
          dispatch({
            type: POST_SIGNOUT_FAILED
          })
        }
      }).catch(err => {
        // Если сервер не вернул данных, также отправляем экшен об ошибке
        dispatch({
          type: POST_SIGNOUT_FAILED
        })
      })

  };
}