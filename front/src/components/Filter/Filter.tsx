import { useRecoilState } from 'recoil';
import { filterTitle } from '../../atom/filterAtom';
import { Filter_Item } from '../../utils/FilterConstants';
import { FilterItemParams } from '../../utils/interfaces';
import { FilterContainer, FilterTitleWrapper, FilterTitle, FilterButton } from './Filter.style';

export default function Filter() {
  const [filterTag, setFilterTag] = useRecoilState<string[]>(filterTitle);

  const handleFilterTag = (filterTag: string[]) => {
    setFilterTag(filterTag);
  };

  return (
    <FilterContainer>
      <FilterTitleWrapper>
        {Filter_Item.map((item: FilterItemParams) => (
          <FilterTitle
            key={item.id}
            onClick={() => handleFilterTag([item.title])}
            className={filterTag.includes(item.title) ? 'active' : ''}
          >
            {item.title}
          </FilterTitle>
        ))}
      </FilterTitleWrapper>
    </FilterContainer>
  );
}
