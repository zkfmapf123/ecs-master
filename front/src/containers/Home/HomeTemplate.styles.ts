import styled from 'styled-components';

export const ListTemplateLayout = styled.div``;
export const HomeBannerWrapper = styled.div``;
export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 32px 32px;
  @media (max-width: 600px) {
    align-items: flex-start;
  }
`;
export const FilterWrapper = styled.div`
  flex: 0 0 auto;
  width: 100%;
  @media (max-width: 600px) {
    width: 100%;
    margin-bottom: 2rem;
  }
`;
