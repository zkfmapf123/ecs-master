import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { BannerProps } from '../utils/interfaces';

function useGetBanners() {
  const [responseData, setResponseData] = useState<BannerProps | null>(null);

  const { isLoading } = useQuery('banners', async () => {
    const response = await axios.get<BannerProps>('/productData/banner.json');
    const data = response?.data;
    setResponseData(data);
    return data;
  });

  return { isLoading, responseData };
}

export default useGetBanners;
