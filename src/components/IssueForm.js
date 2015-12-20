import React from 'react'
import FormBase from 'components/FormBase'

export default class IssueForm extends FormBase {

  render() {
    const { submitting, values, errors, resetForm } = this.props
    const hasErrors = errors.description || errors.title
    const strings = {
      titleClass: `form-group ${errors.title ? 'has-error' : ''}`,
      descriptionClass: `form-group last-form-group ${errors.description ? 'has-error' : ''}`,
      submitValue: submitting ? 'Loading...' : 'Submit Issue'
    }

    return (
        <div className="modal fade"
             id="modal-issue"
             tabIndex="-1"
             role="dialog"
             aria-labelledby="modalIssueLabel">
          <div className="issue-modal modal-dialog" role="document">
            <div className="modal-content">

              <div className="modal-header">
                <button type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title" id="modalIssueLabel">
                  Create Issue
                </h4>
              </div>

              <div className="modal-body">

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

              </div>
              <div className="modal-footer">
                <button type="button"
                        onClick={() => resetForm()}
                        className="btn btn-default"
                        data-dismiss="modal"
                        disabled={submitting}>
                  Close
                </button>

                <button ref="submit"
                        onClick={(e) => this.handleSubmit(e)}

                        type="submit"
                        className="btn btn-primary">
                  {strings.submitValue}
                </button>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

//disabled={submitting || hasErrors}

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