import { dbConfig } from "./utils";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getApi(endpoint, method, body) {
    return fetch(`${this._baseUrl}/${endpoint}`, {
      method,
      headers: this._headers,
      body,
    }).then((res) => this._getResult(res));
  }

  _getResult(res) {
    return res.ok
      ? res.json()
      : Promise.reject(res.status);
  }

  getUserInfo() {
    return this._getApi("users/me", "GET");
  }

  setAvatar({ avatar }) {
    const body = JSON.stringify({ avatar });
    return this._getApi(
      "users/me/avatar",
      "PATCH",
      body
    );
  }

  setUserInfo({ name, about }) {
    const body = JSON.stringify({ name, about });
    return this._getApi(
      "users/me",
      "PATCH",
      body
    );
  }

  getCards() {
    return this._getApi("cards", "GET");
  }

  postCard({ name, link }) {
    const body = JSON.stringify({ name, link });
    return this._getApi("cards", "POST", body);
  }

  deleteCard(id) {
    return this._getApi(`cards/${id}`, "DELETE");
  }

  setCardLikeStatus(id, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return this._getApi(
      `cards/${id}/likes`,
      method
    );
  }
}

export const api = new Api(dbConfig);
