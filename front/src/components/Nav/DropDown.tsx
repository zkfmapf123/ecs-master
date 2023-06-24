import { useState } from 'react';
import { DropdownWrapper, DropdownItem, DropdownLink, DropdownItemWrap } from './Nav.styles';
import { INavProps } from '../../utils/interfaces';

export default function DropdownMenu({ data }: INavProps) {
  const [dropdown, setDropdown] = useState(false);

  const handleDropdownItemClick = () => {
    setDropdown(false);
  };

  return (
    <DropdownWrapper>
      <div onClick={() => setDropdown(!dropdown)}>
        {data &&
          data.map((item, index) => {
            return (
              <DropdownItemWrap key={item.title} onClick={handleDropdownItemClick}>
                <DropdownItem to={item.link}>
                  <DropdownLink>{item.title}</DropdownLink>
                </DropdownItem>
              </DropdownItemWrap>
            );
          })}
      </div>
    </DropdownWrapper>
  );
}
