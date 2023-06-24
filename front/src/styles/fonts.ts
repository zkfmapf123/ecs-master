import { css } from 'styled-components';

export const font = (size: number, weight: number, lineHeight: number = 0) => css`
  font-size: ${size}px;
  font-weight: ${weight};
  line-height: ${lineHeight || size * 1.5}px;
`;

export const fontSize = {
  extraLarge: '20px',
  large: '18px',
  medium: '15px',
  regular: '13px',
  small: '11px',
};
