import { StyledItem, StyledImage, ItemListContainer, ItemListWrapper } from './ItemList.styles';
import useGetItemList from '../../../hooks/useGetItemList';
import { DetailItemParams, Item } from '../../../utils/interfaces';
import { useRecoilState } from 'recoil';
import { detailModal } from '../../../atom/filterAtom';

export default function ItemList() {
  const { isLoading, itemList } = useGetItemList();
  const [detailModalState, setDetailModalState] = useRecoilState<Partial<DetailItemParams>>(detailModal);

  if (isLoading && itemList.length === 0) {
    return <div>Loading...</div>;
  }
  const modalHandler = (event: React.MouseEvent<HTMLButtonElement>, item: Item) => {
    event.preventDefault();
    setDetailModalState({
      ...detailModalState,
      ...item,
      isVisible: true,
    });
  };

  return (
    <ItemListContainer>
      {itemList.map((item) => (
        <StyledItem key={item.id}>
          <ItemListWrapper onClick={(e) => modalHandler(e, item)}>
            <StyledImage src={item.thumbnail} alt={item.desc} />
            <div>
              <span>{item.name}</span>
              <p>{item.desc}</p>
              <p>
                {item.currency}
                {item.price}
              </p>
            </div>
          </ItemListWrapper>
        </StyledItem>
      ))}
    </ItemListContainer>
  );
}
