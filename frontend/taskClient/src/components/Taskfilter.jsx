import React from 'react'

const Taskfilter = ({setFilter, filter}) => {
  return (
    <div>
        <div className="d-flex flex-column flex-md-row gap-2 mb-3 justify-content-center w-100 align-items-center">
        <label htmlFor="filter-assignee" className="form-label mb-0 me-2 fw-bold" >Filter by assignee</label>
        <input
          id="filter-assignee"  
          className="form-control mb-2 mb-md-0"
          placeholder="Filter by assignee"
          value={filter.assignedTo || ''}
          onChange={e => setFilter({ ...filter, assignedTo: e.target.value })}
        />
        <label htmlFor="filter-status" className="form-label mb-0 ms-2 me-2 fw-bold">Status:</label>
        <select
          id="filter-status"
          className="form-control"
          value={filter.status || ''}
          onChange={e => setFilter({ ...filter, status: e.target.value })}
        >
          <option value="">All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>
      
    </div>
  )
}

export default Taskfilter
