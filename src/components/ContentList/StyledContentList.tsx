import styled from "styled-components";

export const StyledContentListContainer = styled.div`
    display: grid;
    gap: 20px;
    margin: 30px 40px 20px 30px;
    grid-template-columns: repeat(4, 1fr);
    @media (max-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
`;

export const StyledContentListItem = styled.div`
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    display: flex;
    flex-direction: column;
    align-items: left;
`

export const StyledContentListImage = styled.img`
    width: 100%;
    height: 80%;
    object-fit: cover;
    margin-top: 10px;
    display: block;
`;

export const StyledContentListGrid = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
`;

export const StyledContentListInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 16px;
    margin: 8px;
`;

export const StyledContentListPrice = styled.div`
    align-self: flex-start;
    margin: 8px;
    font-size: 18px;
    font-weight: bold;
`;
