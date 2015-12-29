import fetch from 'isomorphic-fetch'
import BaseService from 'services/baseService'

export default class IssueService extends BaseService {

  static getIssues(token, page = 1, perPage = 10, assignee, status, search) {
    let url = `/issues?page=${page}&perPage=${perPage}`
    url += (assignee != null) ? `&assignee=${assignee}` : ''
    url += (status != null) ? `&status=${status}` : ''
    url += (search != null) ? `&search=${search}` : ''

    return fetch(url, {headers: this.headers(token)})
        .then(response => response.json())
  }

  static patchIssues(issues, field, value, token) {
    return fetch(`/issues`, this.getOptions('PATCH', {issues, field, value}, token))
        .then(response => response.json())
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