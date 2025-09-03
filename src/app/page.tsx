import BannerSection from "@/components/home/Banner";
import { getHomeBanners } from "@/lib/api";
import { Banner } from "@/types";

export default async function Home() {
  const banners: Banner[] = await getHomeBanners();
  return (
    <>
      <BannerSection banners={banners} />
    </>
  );
}
