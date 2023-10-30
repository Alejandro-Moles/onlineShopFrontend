import React from 'react';
import { FilterList } from './FilterList';
import "./SearchPage"

function FilterMenu({ onFilterChange }) {
  return (
    <div className="filter-menu">
      <FilterList onFilterChange={onFilterChange}/>
    </div>
  );
}

export default FilterMenu;