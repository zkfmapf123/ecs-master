import Banner from '../../components/Banner/Banner';
import Filter from '../../components/Filter/Filter';
import { ListTemplateLayout, HomeBannerWrapper, ItemWrapper, FilterWrapper } from './HomeTemplate.styles';
import ItemList from './components/ItemList';

export default function HomeTemplate() {
  return (
    <ListTemplateLayout>
      <HomeBannerWrapper>
        <Banner />
        <ItemWrapper>
          <FilterWrapper>
            <Filter />
          </FilterWrapper>
          <ItemList />
        </ItemWrapper>
      </HomeBannerWrapper>
    </ListTemplateLayout>
  );
}
