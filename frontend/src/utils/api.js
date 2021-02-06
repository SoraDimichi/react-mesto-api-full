class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(path, params) {
    return fetch(`${this._baseUrl}${path}`, params).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.json()
        .then((data) => Promise.reject(new Error(`Ошибка: ${res.status}: ${data.message}`)));
    });
  }

  getInitialCards() {
    return this._getResponseData('/cards', { headers: this._headers });
  }

  getUserInfo() {
    return this._getResponseData('/users/me/', { headers: this._headers });
  }

  patchUserInfo(data) {
    return this._getResponseData('/users/me/', {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  patchUserAvatar(data) {
    return this._getResponseData('/users/me/avatar', {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  postNewCard(data) {
    return this._getResponseData('/cards', {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  deleteCard(id) {
    return this._getResponseData(`/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  like(id, isLiked) {
    let method;
    if (isLiked) {
      method = 'DELETE';
    } else {
      method = 'PUT';
    }
    return this._getResponseData(`/cards/${id}/likes/`, {
      headers: this._headers,
      method,
    });
  }
}

const api = new Api({
  baseUrl: 'https://api.soradimichi.students.nomoredomains.rocks',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

// const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
//   headers: {
//     authorization: '9f008da4-23f8-43a7-a6e3-8665fc1f4b68',
//     'Content-Type': 'application/json',
//   },
// });

export { api as default };
