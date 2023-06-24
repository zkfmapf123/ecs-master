import { useLocation } from 'react-router-dom';
import { BannerContainer, BannerImage } from './Banner.styles';
import useGetBanners from '../../hooks/useGetBanners';

export default function Banner() {
  const location = useLocation();
  const { isLoading, responseData } = useGetBanners();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const banners = responseData?.banners;
  const bannerImage = banners && banners[location.pathname];

  if (!bannerImage) {
    return null;
  }

  return <BannerContainer>{responseData && <BannerImage src={bannerImage} alt="Banner" />}</BannerContainer>;
}
