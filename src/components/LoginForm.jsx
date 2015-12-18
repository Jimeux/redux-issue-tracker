import React from 'react';

export default class LoginForm extends React.Component {

  handleSubmit(event) {
    event.preventDefault()
    const formData = {
      username: this.refs.username.value,
      password: this.refs.password.value
    }
    this.props.onSubmit(formData)
  }

  render() {
    return (
        <form id="login-form" onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <input ref="username"
                   type="text"
                   placeholder="Username"/>
          </div>
          <div>
            <input ref="password"
                   type="password"
                   placeholder="Password"/>
          </div>
          <button>Log in</button>
        </form>
    )
  }
}