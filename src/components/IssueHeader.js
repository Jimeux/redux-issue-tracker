import React from 'react'
import SearchBox from 'components/SearchBox'
import { Status, Order } from 'actions/filterActions'

//TODO: Split this up into Edit and Filter components
export default class IssueHeader extends React.Component {

  render() {
    const {items, updateIssues, status, query, assignedTo, editors } = this.props // state
    const { selectAll, search, sort, setStatus, setAssigned } = this.props //actions

    const selectedCount = items.filter(f => f.selected).length
    const noneSelected = selectedCount <= 0
    const allSelected = items.length === selectedCount
    const allChecked = !noneSelected && allSelected

    const markAs = (value) => updateIssues(items, 'status', value, value)
    const assignTo = (id, editor) => updateIssues(items, 'assignee', id, editor)

    return (
        <thead>
        <tr className="toolbar-row">

          <th className="checkbox-cell">
            <input onChange={() => selectAll(items, !allChecked)}
                   checked={allChecked}
                   type="checkbox"/>
          </th>

          <th colSpan={4} className="toolbar-cell">
            {noneSelected ? null :
                <ActiveMenu id="mark-as-menu" title="Mark As" values={[
                  [() => markAs(1), 'Resolved'],
                  [() => markAs(0), 'Unresolved']
              ]}/>}

            {noneSelected ? null :
                <ActiveMenu id="assignee-menu" title="Assign To" values={[
                  [() => assignTo(null, null), 'Unassign'],
                  ...editors.map((e) => [() => assignTo(e._id, e), e.username])
              ]}/>}

            {noneSelected ? null :
                <span className="selection">{`${selectedCount} selected `}</span>}

            {/** Display when no items selected */}

            {!noneSelected ? null :
                <ActiveMenu id="status-menu" title={Status[status] || 'All Issues'} values={[
                  [() => setStatus(null), 'All Issues'],
                  ...Status.map((s, i) => [() => setStatus(i), s])
              ]}/>}

            {!noneSelected ? null :
                <ActiveMenu id="assigned-menu" title={assignedTo ? assignedTo.username : 'Assigned To'} values={[
                  [() => setAssigned(''), 'Everyone'],
                  ...editors.map((e) => [() => setAssigned(e), e.username])
              ]}/>}

            {!noneSelected ? null :
                <ActiveMenu id="sort-menu" title="Sort" values={[
                  [() => sort(Order.DATE), 'Created'],
                  [() => sort(Order.TITLE), 'Title'],
                  [() => sort(Order.ASSIGNEE), 'Assignee'],
                  [() => sort(Order.STATUS), 'Status'],
                  [() => sort(Order.VOTES), 'Votes']
              ]}/>}

            {!noneSelected ? null : <SearchBox onSearch={query => search(query)} query={query}/>}

          </th>
        </tr>
        </thead>
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