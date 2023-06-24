import { NavContainer, IconWrapper, SearchIcon, Logo, UserIcon, NavItemWrapper, NavItemSpan } from './Nav.styles';
import { Link } from 'react-router-dom';
import NavItems from './NavItems';
import { NavItemsParams } from '../../utils/interfaces';
import { NAV_ITEMS } from '../../utils/NavConstants';

export default function Nav() {
  return (
    <NavContainer>
      <Link to="/">
        <Logo alt="Logo" src="/images/logo.png" />
      </Link>
      <NavItemWrapper>
        {NAV_ITEMS.map((item: NavItemsParams) => {
          return (
            <NavItemWrapper key={item.id}>
              <NavItems data={item} />
            </NavItemWrapper>
          );
        })}
      </NavItemWrapper>
      <IconWrapper>
        <SearchIcon alt="Logo" src="/images/search.png" />
        <UserIcon alt="Logo" src="/images/user.png" />
        <Link to="/cartdetail">
          <NavItemSpan>CART</NavItemSpan>
        </Link>
      </IconWrapper>
    </NavContainer>
  );
}
