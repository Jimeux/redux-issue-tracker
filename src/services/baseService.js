import fetch from 'isomorphic-fetch'
import Rest from 'helpers/rest'

export default class BaseService {

  static getOptions(method, body, token) {
    return {
      method: method,
      body: JSON.stringify(body),
      headers: this.headers(token)
    }
  }

  static headers(token) {
    return {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  static passwordGrant(username, password) {
    return {
      username,
      password,
      grant_type: 'password',
      client_id: 'issue_tracker', //TODO: Make client entry
      client_secret: 'issue_tracker',
      scope: 'read'
    }
  }

}