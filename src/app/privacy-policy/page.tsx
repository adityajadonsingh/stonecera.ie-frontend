import FooterContent from "@/components/FooterContent";
import PageBanner from "@/components/PageBanner";
import { getLegalPageContent } from "@/lib/api";

export default async function LegalPage() {
  const content = await getLegalPageContent("Privacy Policy");
  return (
    <>
      <PageBanner
        bgImg="/media/privacy-banner.webp"
        bgImgAlt="Privacy Policy"
        breadcrum={[{ slug: "", slugName: "Privacy Policy" }]}
        pageName="Privacy Policy"
        categoryContent={null}
      />
      {content !== null && (
        <div className="pt-10">
          <FooterContent content={content} isFullPage={true} />
        </div>
      )}
    </>
  );
}
