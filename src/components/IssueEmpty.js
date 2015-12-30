import React from 'react'

export default class IssueEmpty extends React.Component {
  render() {
    return (
        <tbody>
        <tr className="no-issues">
          <td colSpan={1}/>
          <td colSpan={4}>
            <div className="message">No issues found...</div>
            <br />
            <button className="btn btn-default" onClick={() => this.props.clearFilters()}>
              Clear search and filters</button>
          </td>
        </tr>
        </tbody>
    )
  }
}