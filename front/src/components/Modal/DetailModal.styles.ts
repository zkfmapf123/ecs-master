import styled from 'styled-components';
import { theme } from '../../styles';

export const ModalWrapper = styled.div`
  width: 1220px;
  height: 700px;
  background: ${theme.GREY_MEDIUM_X2};
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-start;
`;

export const CloseBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;
export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
export const ThumbnailImage = styled.img`
  width: 50%;
  height: 100%;
  object-fit: cover;
  margin-right: 1rem;
`;

export const ModalInfo = styled.div`
  flex: 1;
  height: 100%;
  padding: 1.2rem;
  background: ${theme.GREY};
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
export const CartQuantity = styled.span`
  font-size: 0.9rem;
  font-weight: 800;
  color: ${theme.GREY_DARK};
  margin-right: 0.5rem;
`;
export const ModalTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  font-family: Helvetica, Arial, sans-serif;
`;

export const ModalDescription = styled.div`
  font-size: 1rem;
  font-family: Helvetica, Arial, sans-serif;
  line-height: 1.5;
  margin-bottom: 2rem;
`;
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`;

export const TableDescription = styled.div`
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 2rem;
  p {
    margin-bottom: 2rem;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 0.5rem;
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${theme.GREY_LIGHT};
`;

export const TableHeader = styled.th`
  padding: 0.5rem;
  border: none;
  font-weight: bold;
  text-align: left;
`;

export const TableData = styled.td`
  padding: 0.5rem;
  border: none;
`;

export const ColorsContainer = styled.div`
  margin-bottom: 0.5rem;
`;

export const ColorSpan = styled.button`
  margin-right: 0.5rem;
  background: ${theme.GREY_DARK};
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: default;
`;

export const SizesContainer = styled.div``;

export const SizeSpan = styled.button`
  margin-right: 0.5rem;
  cursor: default;
  background: ${theme.GREY_DARK};
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: ${theme.GREY_DARK};
`;

export const ColorButton = styled.button<{ isSelected: boolean }>`
  margin-right: 0.5rem;
  background: ${(props) => (props.isSelected ? theme.GREY_DARK : theme.GREY_LIGHT)};
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
`;

export const SizeButton = styled.button<{ isSelected: boolean }>`
  margin-right: 0.5rem;
  background: ${(props) => (props.isSelected ? theme.GREY_DARK : theme.GREY_LIGHT)};
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
`;
export const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  margin-bottom: 2rem;
  width: 100%;
`;

export const QuantityLabel = styled.span`
  margin-right: 0.5rem;
`;

export const QuantityButton = styled.button`
  background: ${theme.GREY_DARK};
  color: #eee;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
`;

export const QuantityValue = styled.span`
  margin: 0 0.5rem;
`;
export const AddToButton = styled.button<{ isSelected: boolean }>`
  width: 100%;
  height: 40px;
  background: ${(props) => (props.isSelected ? theme.GREY_DARK : theme.GREY_DARK)};
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

export const AddButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 40px;
`;
