import React from 'react';
import { SearchIcon } from './SearchIcon';
import { StyledSearchContent, StyledSearchInput, StyledSearchInputContainer } from './StyledSearchInput';

  type props = {
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

  export const SearchInput = ({ id, value, onChange }: props) => {
    return (
      <StyledSearchInputContainer>
          <StyledSearchContent>
            <StyledSearchInput
              id={id}
              type="text"
              placeholder="Find the items you're looking for"
              value={value}
              onChange={onChange}
              style={{ width: '100%', padding: '10px' }}
            />
            <SearchIcon />
          </StyledSearchContent>
      </StyledSearchInputContainer>
    );
  };