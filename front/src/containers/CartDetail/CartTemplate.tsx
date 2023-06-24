import { useRecoilState } from 'recoil';
import { userBucket } from '../../atom/bucketAtom';
import { BucketParams, BucketItemParamas } from '../../utils/interfaces';
import {
  ListTemplateLayout,
  CartContainer,
  ContentWrapper,
  CartTitle,
  UserBucket,
  UserName,
  ItemsContainer,
  ItemWrapper,
  PurchaseWrapper,
  PurchaseButton,
  DeleteButton,
  ItemContent,
  ItemInfo,
} from './CartTemplate.styles';

export default function CartTemplate() {
  const [userBucketState, setUserBucketState] = useRecoilState<BucketParams>(userBucket);

  const handleDeleteItem = (userName: string, item: BucketItemParamas) => {
    const updatedUserBucketState = { ...userBucketState };
    updatedUserBucketState[userName] = updatedUserBucketState[userName].filter(
      (it: BucketItemParamas) => it.uuid !== item.uuid,
    );
    setUserBucketState(updatedUserBucketState);
  };
  return (
    <ListTemplateLayout>
      <CartContainer>
        <ContentWrapper>
          <CartTitle>Shopping Cart</CartTitle>
          {Object.entries(userBucketState).map(([userName, items], index) => (
            <UserBucket key={String(index)}>
              <UserName>{userName}'s Shopping list</UserName>
              <ItemsContainer>
                {items.map((item: Readonly<BucketItemParamas>, index: number) => (
                  <ItemWrapper key={String(index)}>
                    <ItemContent>
                      <ItemInfo>
                        <p>이름: {item.name}</p>
                        <p>수량: {item.quantity}</p>
                        <p>사이즈: {item.size}</p>
                        <p>색상: {item.color}</p>
                      </ItemInfo>
                      <DeleteButton onClick={() => handleDeleteItem(userName, item)}>삭제</DeleteButton>
                    </ItemContent>
                  </ItemWrapper>
                ))}
              </ItemsContainer>
            </UserBucket>
          ))}
          <PurchaseWrapper>
            <PurchaseButton>구매하기</PurchaseButton>
          </PurchaseWrapper>
        </ContentWrapper>
      </CartContainer>
    </ListTemplateLayout>
  );
}
