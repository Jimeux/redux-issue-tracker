import React from 'react'
import FormBase from 'components/FormBase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as LoginActionCreators from 'actions/loginFormActions'

class LoginForm extends FormBase {

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
                   onBlur={() => this.handleBlur('username')}
                   onChange={() => this.handleChange('username')}
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
                   onBlur={() => this.handleBlur('password')}
                   onChange={() => this.handleChange('password')}
                   type="password"
                   className="form-control"
                   ref="password"
                   placeholder="Password"/>
          </div>

          <button className="btn btn-primary btn-block"
                  type="submit"
                  disabled={hasErrors || submitting}>
            {strings.submitValue}
          </button>

        </form>
    )
  }
}

LoginForm.prototype.Validators = class {
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

function mapPropsToState(state) {
  return state.loginForm
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LoginActionCreators, dispatch)
}

export default connect(mapPropsToState, mapDispatchToProps)(LoginForm)