import FooterContent from "@/components/FooterContent";
import PageBanner from "@/components/PageBanner";
import { getLegalPageContent } from "@/lib/api";

export default async function LegalPage() {
    const content = await getLegalPageContent("Terms & Conditions")
  return (
    <>
      <PageBanner
        bgImg="/media/terms-banner.webp"
        bgImgAlt="Terms & Conditions"
        breadcrum={[{ slug: "", slugName: "Terms & Conditions" }]}
        pageName="Terms & Conditions"
        categoryContent={null}
      />
      {
        content !== null && <div className="pt-10"><FooterContent content={content} isFullPage={true} /></div>
      }
    </>
  );
}
