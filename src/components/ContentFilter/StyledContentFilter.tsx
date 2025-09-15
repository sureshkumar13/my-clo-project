import styled from 'styled-components'



export const StyledContentFilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px 40px 20px 30px;
`

export const StyledContentFilterContents = styled.div`
    display: flex;
    gap: 25px;
    align-items: center;
`

export const StyledContentFilterLabel = styled.label`
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
`

export const StyledContentButton = styled.button`
    padding: 8px 16px;
    background: #7d8186ff;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;

    &:hover {
        background: #333;
    }
`;