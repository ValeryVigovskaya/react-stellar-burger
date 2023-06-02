function checkResponse(res) {      //функция проверки ответа сервера
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const config = {
  baseUrl: 'https://norma.nomoreparties.space/api/ingredients',
  headers: {
    'Content-Type': 'application/json'
  }
}

const getDataFetch = () => {
  return fetch(`${config.baseUrl}`, {
    method: 'GET',
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль 
    });
}

const postOrder = (ingredients) => {
  return fetch('https://norma.nomoreparties.space/api/orders', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      ingredients
    })
  })
    .then(checkResponse)
    .catch((err) => {
      console.log(err)
    });
}

export { getDataFetch, postOrder }
