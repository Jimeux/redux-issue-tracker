import fetch from 'isomorphic-fetch'
import BaseService from 'services/baseService'

export default class UserService extends BaseService {

  static getEditors(token) {
    const options = { headers: this.headers(token) }

    return fetch('/users/editors', options)
        .then(response => response.json())
  }

  static login(username, password) {
    const body = this.passwordGrant(username, password)
    const options = this.getOptions('POST', body)

    return fetch('/oauth/token', options)
  }

}