import styled from 'styled-components';

export const ItemListContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 3rem;
  transition: grid-template-columns 0.3s ease;
  @media (max-width: 1350px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1300px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
export const ItemListWrapper = styled.button`
  span {
    font-size: 20px;
    font-weight: bold;
  }

  p {
    margin-top: 0.3rem;
    text-align: center;
    font-size: 15px;
  }
`;
export const StyledItem = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const StyledImage = styled.img`
  height: 350px;
  object-fit: cover;
  margin-bottom: 2rem;
  cursor: pointer;
  opacity: 1;
  transition: width 0.3s ease, height 0.3s ease;
  &:hover {
    opacity: 0.8;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  }
  @media (max-width: 1200px) {
    width: 500px;
    height: 500px;
  }
  @media (max-width: 900px) {
    width: 400px;
    height: 400px;
  }
  @media (max-width: 600px) {
    width: 100%;
    height: auto;
  }
`;
