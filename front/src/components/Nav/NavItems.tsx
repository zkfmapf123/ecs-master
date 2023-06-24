import { NavItemSpan, NavItemWrapper } from './Nav.styles';
import { useState } from 'react';
import Dropdown from './DropDown';
import { Link } from 'react-router-dom';
import { INavMenuProps } from '../../utils/interfaces';

export default function NavItems({ data }: INavMenuProps) {
  const [dropdown, setDropdown] = useState<boolean>(false);
  return (
    <NavItemWrapper onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
      <Link style={{ color: 'black' }} to={data.path}>
        <NavItemSpan>{data.title}</NavItemSpan>
      </Link>
      {dropdown && <Dropdown data={data.downList} />}
    </NavItemWrapper>
  );
}
