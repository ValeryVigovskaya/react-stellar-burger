import { IOrder, TResponseBody, IIngredient, IUser, TOrder, IPatchUserObj, IPostRegisterUserObj, IPostResetPassObj, THeaders} from "../utils/types";


const BASE_URL = "https://norma.nomoreparties.space/api/";

const request = <T>(endpoint: RequestInfo | URL, options?: RequestInit): Promise<T> => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
}

const checkResponse = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((err: string) => Promise.reject(err));
};

const getDataFetch = (): Promise<TResponseBody<'data', IIngredient[]>> => {
  return request("ingredients");
};

const postOrder = (ingredients: string[]): Promise<TResponseBody<'order', Readonly<TOrder>>> => {
  return request("orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    } as HeadersInit,
    body: JSON.stringify({
      ingredients,
    }),
  });
};

const getOrdersFetch = (number: number): Promise<TResponseBody<'orders', IOrder[]>>  => {
  return request(`orders/${number}`);
};

const getUser = (): Promise<TResponseBody<'user', Readonly<IUser>>> => {
  return fetchWithRefresh("auth/user", {
    method: "GET",
    headers: {
      authorization: localStorage.getItem("accessToken"),
      "Content-Type": "application/json;charset=utf-8",
    } as (HeadersInit | undefined) & THeaders,
  });
};

export const patchUser = (obj: IPatchUserObj) => {
  return fetchWithRefresh("auth/user", {
    method: "PATCH",
    headers: {
      authorization: localStorage.getItem("accessToken"),
      "Content-Type": "application/json;charset=utf-8",
    } as (HeadersInit | undefined) & THeaders,
    body: JSON.stringify(obj),
  });
};

export const refreshToken = (): Promise<TResponseBody> => {
  return request("auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const fetchWithRefresh = async (
  endpoint: string,
  options: RequestInit & { headers: { authorization: string | null, "Content-Type": string } }
): Promise<TResponseBody<'user', Readonly<IUser>>> => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(`${BASE_URL}${endpoint}`, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

const login = (obj: { email: string; password: string }): Promise<TResponseBody<'user', Readonly<IUser>>> => {
  return request("auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
};

const logOut = (): Promise<TResponseBody> => {
  return request("auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken"),
    } as HeadersInit,
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

const postRegister = (obj: IPostRegisterUserObj): Promise<TResponseBody<'register', Readonly<IUser>>> => {
  return request("auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
};

const postMail = (email: string): Promise<TResponseBody<'pass_reset', string>> => {
  return request("password-reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
    }),
  });
};

const resetPass = (obj: IPostResetPassObj): Promise<TResponseBody<'reset_password', string>> => {
  return request("password-reset/reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      obj
    ),
  });
};

export {
  getDataFetch,
  postOrder,
  postMail,
  getUser,
  login,
  logOut,
  postRegister,
  resetPass,
  getOrdersFetch,
};
