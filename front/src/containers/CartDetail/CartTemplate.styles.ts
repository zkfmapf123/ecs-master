import styled from 'styled-components';
import { theme } from '../../styles';

export const ListTemplateLayout = styled.div`
  display: flex;
  height: 800px;
`;

export const CartContainer = styled.div`
  display: flex;
  margin: 1rem 10rem;
  width: 100%;
  padding: 30px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const CartTitle = styled.span`
  font-size: 2rem;
  padding-bottom: 24px;
`;

export const UserBucket = styled.div`
  margin-bottom: 1rem;
`;

export const UserName = styled.span`
  font-size: 1.5rem;
  margin-bottom: 24px;
`;

export const ItemsContainer = styled.div`
  width: 100%;
`;

export const ItemWrapper = styled.div`
  background-color: ${theme.GREY_LIGHT};
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
`;
export const ItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ItemInfo = styled.div`
  flex: 1;
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  font-weight: bold;
  color: ${theme.RED};
  cursor: pointer;
  padding-right: 3rem;
`;
export const PurchaseWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PurchaseButton = styled.button`
  width: 250px;
  height: 40px;
  background: ${theme.GREY_MEDIUM_X3};
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background: #4c4747;
  }
`;
