import React from 'react'
import SearchBox from 'components/SearchBox'
import { Roles } from 'actions/authActions'
import { Status } from 'constants'//'shared/constants'
import { Order } from 'actions/filterActions'

export default class IssueHeader extends React.Component {
  render() {
    const { items, role, selectAll } = this.props

    const selectedCount = items.filter(f => f.selected).length
    const noneSelected = selectedCount <= 0
    const allSelected = items.length === selectedCount
    const allChecked = !noneSelected && allSelected

    return (
        <thead>
        <tr className="toolbar-row">
          <th className="checkbox-cell">
            {role < Roles.EDITOR ? null :
                <input onChange={() => selectAll(items, !allChecked)}
                       checked={allChecked}
                       type="checkbox"/>}
          </th>
          {noneSelected ? <FilterBar {...this.props}/> : <EditBar {...this.props}/>}
        </tr>
        </thead>
    )
  }
}

class EditBar extends React.Component {
  render() {
    const { items, status, editors, updateIssues } = this.props
    const selectedCount = items.filter(f => f.selected).length

    const markAs = (value) => updateIssues(items, 'status', value, value)
    const assignTo = (id, editor) => updateIssues(items, 'assignee', id, editor)

    return (
        <th colSpan={4} className="toolbar-cell">
          <ActiveMenu id="mark-as-menu" title="Mark As" values={[
                  [() => markAs(1), 'Resolved'],
                  [() => markAs(0), 'Unresolved']
              ]}/>

          <ActiveMenu id="assignee-menu" title="Assign To" values={[
                  [() => assignTo(null, null), 'Unassign'],
                  ...editors.map((e) => [() => assignTo(e._id, e), e.username])
              ]}/>

          <span className="selection">{`${selectedCount} selected `}</span>
        </th>
    )
  }
}

class FilterBar extends React.Component {
  render() {
    const { status, query, assignedTo, editors } = this.props
    const { search, sort, setStatus, setAssigned } = this.props

    return (
        <th colSpan={4} className="toolbar-cell">
          <ActiveMenu id="status-menu" title={Status[status] || 'All Issues'} values={[
                  [() => setStatus(null), 'All Issues'],
                  ...Status.map((s, i) => [() => setStatus(i), s])
              ]}/>

          <ActiveMenu id="assigned-menu" title={assignedTo ? assignedTo.username : 'Assigned To'} values={[
                  [() => setAssigned(null), 'Everyone'],
                  ...editors.map((e) => [() => setAssigned(e), e.username])
              ]}/>

          <ActiveMenu id="sort-menu" title="Sort" values={[
                  [() => sort(Order.DATE), 'Created'],
                  [() => sort(Order.VOTES), 'Votes']
              ]}/>

          <SearchBox onSearch={query => search(query)} query={query}/>
        </th>
    )
  }
}

class ActiveMenu extends React.Component {
  render() {
    const { id, title, values } = this.props
    const lis = values.map(v => {
      return <li key={`li-${v[1]}`}><a onClick={v[0]}>{v[1]}</a></li>
    })
    return (
        <div className="dropdown">
          <button id={id} className="btn btn-default dropdown-toggle" type="button"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            {title} <span className="caret"/>
          </button>
          <ul className="dropdown-menu" aria-labelledby={id}>{lis}</ul>
        </div>
    )
  }
}