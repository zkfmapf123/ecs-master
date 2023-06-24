import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalWrapper = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 2rem;
  max-width: 500px;
  text-align: center;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 1rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const ModalContent = styled.div`
  margin-bottom: 1rem;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

export const ContinueShoppingButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  color: #fff;
  margin-right: 1rem;
  cursor: pointer;
`;

export const GoToCartButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #333;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
`;

const ModalActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;
