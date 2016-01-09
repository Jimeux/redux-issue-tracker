import React from 'react'
import {Modal} from 'react-bootstrap'
import FormBase from 'components/FormBase'

export default class IssueForm extends FormBase {

  render() {
    const { visible, submitting, values, errors, resetForm, setVisible } = this.props
    const hasErrors = errors.description || errors.title
    const strings = {
      titleClass: `form-group ${errors.title ? 'has-error' : ''}`,
      descriptionClass: `form-group last-form-group ${errors.description ? 'has-error' : ''}`,
      submitValue: submitting ? 'Loading...' : 'Submit Issue'
    }

    return (
        <Modal show={visible} onHide={() => setVisible(false)} className="issue-modal">

          <Modal.Header closeButton>
            <Modal.Title>Create Issue</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className={strings.titleClass}>
              <label className="control-label">
                Title
                <span className="error">{errors.title}</span>
              </label>

              <input value={values.title}
                     onBlur={() => this.handleBlur('title')}
                     onChange={() => this.handleChange('title')}
                     type="text"
                     className="form-control"
                     ref="title"
                     placeholder="Title"/>
            </div>

            <div className={strings.descriptionClass}>
              <label className="control-label">
                Description
                <span className="error">{errors.description}</span>
              </label>

              <textarea value={values.description}
                        onBlur={() => this.handleBlur('description')}
                        onChange={() => this.handleChange('description')}
                        ref="description"
                        rows={4}
                        className="form-control"
                        placeholder="Description"/>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button type="button"
                    onClick={() => setVisible(false)}
                    className="btn btn-default"
                    disabled={submitting}>
              Close
            </button>

            <button ref="submit"
                    onClick={(e) => this.handleSubmit(e)}
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting || hasErrors}>
              {strings.submitValue}
            </button>
          </Modal.Footer>
        </Modal>
    )
  }
}

IssueForm.prototype.Validators = class {
  static title(value) {
    if (!value)
      return 'is required'
    else if (value.length < 5)
      return 'must be 5 or more characters'
  }

  static description(value) {
    if (!value)
      return 'is required'
    else if (value.length < 5)
      return 'must be 5 or more characters'
  }

  static validateAll(fields) {
    const titleError = this.title(fields.title)
    const descriptionError = this.description(fields.description)
    const hasErrors = titleError || descriptionError
    return {
      hasErrors,
      title: titleError,
      description: descriptionError
    }
  }
}