import React from 'react'

export default class LoginForm extends React.Component {

  handleSubmit() {
    const { username, password } = this.refs
    const formData = {
      username: username.value,
      password: password.value
    }
    const errors = Validators.validateAll(formData)

    if (errors.hasErrors)
      this.props.updateErrors(errors)
    else
      this.props.submitLoginForm(formData)
  }

  handleBlur(field) {
    const value = this.refs[field].value
    const error = Validators[field](this.refs[field].value)
    this.props.updateValue(field, value, error)
  }

  render() {
    const { submitting, values, errors } = this.props
    const hasErrors = errors.username || errors.password
    const strings = {
      usernameClass: `form-group ${errors.username ? 'has-error' : ''}`,
      passwordClass: `form-group ${errors.password ? 'has-error' : ''}`,
      submitValue: submitting ? 'Loading...' : 'Sign In'
    }

    return (
        <form id="login-form" onSubmit={(e) => this.handleSubmit(e)}>

          <div className={strings.usernameClass}>
            <label className="control-label">
              Username
              <span className="error">{errors.username}</span>
            </label>
            <input value={values.username}
                   onChange={() => this.handleBlur('username')}
                   type="text"
                   className="form-control"
                   ref="username"
                   placeholder="Username"/>
          </div>

          <div className={strings.passwordClass}>
            <label className="control-label">
              Password
              <span className="error">{errors.password}</span>
            </label>
            <input value={values.password}
                   onChange={() => this.handleBlur('password')}
                   type="password"
                   className="form-control"
                   ref="password"
                   placeholder="Password"/>
          </div>

          <button onClick={() => this.handleSubmit()}
                  className="btn btn-primary btn-block"
                  type="button"
                  disabled={hasErrors || submitting}>
            {strings.submitValue}
          </button>

        </form>
    )
  }
}

class Validators {
  static username(value) {
    if (!value)
      return 'is required'
    else if (value.length < 5)
      return 'must be 5 or more characters'
    else if (!value.match(/^[a-z0-9_]+$/i))
      return `can't contain special characters`
  }

  static password(value) {
    if (!value)
      return 'is required'
    else if (value.length < 6)
      return 'must be 6 or more characters'
  }

  static validateAll(fields) {
    const usernameError = this.username(fields.username)
    const passwordError = this.password(fields.password)
    const hasErrors = usernameError || passwordError
    return {
      hasErrors,
      username: usernameError,
      password: passwordError
    }
  }
}