const BASE_URL = "https://norma.nomoreparties.space/api/";

function checkResponse(res) {      //функция проверки ответа сервера
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function request(endpoint, options) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
}


const getDataFetch = () => {
  return request('ingredients')
}

const postOrder = (ingredients) => {
  return request('orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ingredients
    })
  })
}

export { getDataFetch, postOrder }
