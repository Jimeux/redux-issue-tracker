import fetch from 'isomorphic-fetch'
import BaseService from 'services/baseService'

export default class IssueService extends BaseService {

  static getIssues(page = 1, token) {
    return fetch('/issues', {headers: this.headers(token)})
        .then(response => response.json())
        .then(json => json.issues)
  }

  static patchIssues(issues, field, value, token) {
    return fetch(`/issues`, this.getOptions('PATCH', {issues, field, value}, token))
        .then(response => response.json())
        .then(json => json.issues)
  }

  static createVote(issueId, token) {
    return fetch(`/issues/${issueId}/plusone`, this.getOptions('POST', {}, token))
        .then(response => response.json())
  }

  static createIssue(attributes, token, onValidation, onSuccess) {
    return fetch('/issues', this.getOptions('POST', attributes, token))
        .then(response => {
          this.handleResponse(response, onValidation, onSuccess)
        })
        .catch(console.error.bind(console))
  }

  static handleResponse(response, onValidationError, onSuccess) {
    if (response.status === 401 || response.status === 403) {
      console.log('Please login')
      //dispatch({type: PROMPT_LOGIN}))
    } else if (response.status === 422) {
      response.json().then(onValidationError)
    } else if (response.status >= 200 && response.status < 300) {
      response.json().then(onSuccess)
    } else {
      console.log(`Unexpected error ${response.status}:`, response)
      //dispatch({type: UNEXPECTED_ERROR}))
    }
  }

}