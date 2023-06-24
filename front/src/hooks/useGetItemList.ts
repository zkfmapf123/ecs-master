import axios from 'axios';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Item } from '../utils/interfaces';
import { useRecoilState } from 'recoil';
import { filterTitle } from '../atom/filterAtom';

function useGetItemList() {
  const [itemList, setItemList] = useState<Item[]>([]);
  const [filterTag] = useRecoilState<string[]>(filterTitle);

  const { isLoading, refetch } = useQuery(
    'List',
    async () => {
      const response = await axios.get('/productData/product.json');
      const data = response?.data;
      const filteredItems =
        filterTag.length === 0 || filterTag[0] === 'ALL'
          ? data.flugo
          : data.flugo.filter((item: Item) => item.category === filterTag[0]);
      setItemList(filteredItems);

      return data;
    },
    {
      enabled: false,
    },
  );

  useEffect(() => {
    refetch();
  }, [filterTag, refetch]);

  return { isLoading, itemList };
}

export default useGetItemList;
