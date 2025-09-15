import styled from "styled-components";

export const StyledSearchInputContainer = styled.div`
    margin: 20px 20px 0 30px;
`;

export const StyledSearchContent = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

export const StyledSearchInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`