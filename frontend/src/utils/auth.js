import { authConfig } from './utils';

class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getApi({
    endpoint,
    method,
    body,
    optionalHeaders,
  }) {
    return fetch(`${this._baseUrl}/${endpoint}`, {
      method,
      credentials: 'include',
      headers: {
        ...this._headers,
        ...optionalHeaders,
      },
      body: JSON.stringify(body),
    }).then((res) => this._getResult(res));
  }

  _getResult(res) {
    return res.ok
      ? res.json()
      : Promise.reject(res.status);
  }

  register({ password, email }) {
    return this._getApi({
      endpoint: 'signup',
      method: 'POST',
      body: {
        password,
        email,
      },
    });
  }

  login({ password, email }) {
    return this._getApi({
      endpoint: 'signin',
      method: 'POST',
      body: {
        password,
        email,
      },
    });
  }

  logout() {
    return this._getApi({
      endpoint: 'signout',
      method: 'POST',
    });
  }
}

export const auth = new Auth(authConfig);
