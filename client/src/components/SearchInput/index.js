import React from 'react';

import { history } from 'store';

// style
import { SearchBox } from './style';

function SearchInput() {
  const onSearch = (value) => {
    history.push(`/search/${value}`);
    window.location.reload();
  };

  return <SearchBox placeholder="Search" onSearch={onSearch} />;
}

export default SearchInput;
