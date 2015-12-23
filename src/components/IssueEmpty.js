import React from 'react'

export default class IssueEmpty extends React.Component {
  render() {
    return (
        <tbody>
        <tr className="no-issues">
          <td colSpan={1}/>
          <td colSpan={4}>
            <span className="message">No issues found...</span>
          </td>
        </tr>
        </tbody>
    )
  }
}