import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Logo = styled.img`
  width: 100px;
`;
export const NavItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  &:hover {
    cursor: pointer;
  }
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 64px;

  @media (max-width: 768px) {
    ${NavItemWrapper} {
      display: none;
    }
  }
`;
export const NavItemSpan = styled.span`
  padding: 10px;
  display: flex;
  height: 35px;
  align-items: center;
  font-size: 14px;
  color: #666;
  font-family: Cabin, sans-serif;
  font-weight: 600;
  transition: color 0.3s ease;
  &:hover {
    background-color: #ddd;
    cursor: pointer;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    color: #333;
  }
`;

export const NavItemSubtitle = styled.span`
  display: flex;
  height: 20px;
  align-items: center;
  font-size: 12px;
  color: #999;
  font-family: Cabin, sans-serif;
  transition: color 0.3s ease;
  &:hover {
    color: #333;
    cursor: pointer;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

export const SearchIcon = styled.img`
  width: 25px;
  cursor: pointer;
`;

export const UserIcon = styled.img`
  width: 38px;
  cursor: pointer;
`;

export const NavTitle = styled.div`
  &:hover {
    cursor: pointer;
    background-color: #ddd;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  }
`;

export const DropdownWrapper = styled.div`
  position: absolute;
  top: 70px;
  width: 150px;
  height: auto;
`;

export const DropdownItemWrap = styled.div`
  padding: 10px;
  background-color: white;
  &:hover {
    background-color: #ddd;
  }
`;

export const DropdownItem = styled(Link)`
  /* padding: 10px;
  background-color: white;
  &:hover {
    background-color: #ddd;
  } */
`;

export const DropdownLink = styled.div`
  color: black;
  text-decoration: none;
`;
