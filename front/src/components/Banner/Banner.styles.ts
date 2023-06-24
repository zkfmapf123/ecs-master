import styled from 'styled-components';
import { BannerContainerProps } from '../../utils/interfaces';

export const BannerContainer = styled.div<BannerContainerProps>`
  width: 100%;
  height: 240px;
  margin-bottom: 2rem;
  background-image: url(${(props) => props.bannerImage});
  background-position: center center;
  background-size: cover;
`;
export const BannerImage = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;
