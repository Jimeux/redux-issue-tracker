import React from 'react'

export default class SearchBox extends React.Component {

  handleChange() {
    let query = this.refs.input.value
    this.props.onSearch(query)
  }

  render() {
    return (
        <span className="search-box">
          <input ref="input"
                 className="form-control"
                 type="text"
                 value={this.props.query}
                 placeholder="Search"
                 onChange={() => this.handleChange()}/>
        </span>
    )
  }
}