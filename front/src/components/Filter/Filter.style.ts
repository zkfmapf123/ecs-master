import styled from 'styled-components';
import { theme } from '../../styles';

export const FilterContainer = styled.div`
  background: ${theme.GREY_MEDIUM};
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.24);
  border-radius: 4px;
  width: 100%;
  height: 120px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding-bottom: 1rem;
  }
`;

export const FilterTitleWrapper = styled.div`
  padding: 32px 32px;
  display: flex;

  @media screen and (max-width: 768px) {
    padding: 0;
    flex-wrap: wrap;
  }
`;

export const FilterTitle = styled.div`
  padding: 32px 0;
  cursor: pointer;
  padding: 0 1rem;
  &.active {
    font-weight: bold;
  }

  @media screen and (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
`;

export const FilterButton = styled.button`
  width: 110px;
  height: 60px;
  border: 1px solid rgba(51, 51, 51, 0.2);
  color: rgba(51, 51, 51, 0.2);
  transition: background-color 0.3s ease;
  &:hover {
    background-color: black;
    color: white;
  }

  @media screen and (max-width: 768px) {
    margin-top: 1rem;
    width: 100%;
  }
`;
