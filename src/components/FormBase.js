import React from 'react'

export default class FormBase extends React.Component {

  updateValue(field, check) {
    const value = this.refs[field].value
    let error = this.props.errors[field]
    if (error || check)
      error = this.Validators[field](value)

    this.props.updateValue(field, value, error)
  }

  handleChange(field) {
    this.updateValue(field, false)
  }

  handleBlur(field) {
    this.updateValue(field, true)
  }

  handleSubmit(e) {
    e.preventDefault()
    const formData = {}
    Object.keys(this.refs).forEach((field) => {
      formData[field] = this.refs[field].value
    })

    const errors = this.Validators.validateAll(formData)

    if (errors.hasErrors)
      this.props.updateErrors(errors)
    else
      this.props.submitForm(formData)
  }
}