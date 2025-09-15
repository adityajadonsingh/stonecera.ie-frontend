import ProductGallery from "@/components/product/ProductGallery";
import { getProductBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import HtmlContent from "@/components/HtmlContent";

interface ProductPageProps {
    params: Promise<{ category: string; product: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { category, product } = await params;
    const productData = await getProductBySlug(product);

    if (
        category !== productData?.category.slug ||
        product !== productData.slug
    ) {
        return notFound();
    }

    return (
        <section className="product-top py-10">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Image Gallery */}
                    <ProductGallery images={productData.images} />

                    {/* Product Details */}
                    <div className="product-info">
                        <div className="product-bread mb-3">
                            <ul className="flex flex-nowrap gap-x-2 font-semibold text-[#867f54] capitalize">
                                <li>
                                    <Link href={"/"}>Home</Link>
                                </li>
                                <li>/</li>
                                <li><Link href={`/product-category/`}>Product Category</Link></li>
                                <li>/</li>
                                <li><Link href={`/product-category/${category}/`}>{productData.category?.name}</Link></li>
                                <li>/</li>
                                <li>{productData.name}</li>
                            </ul>
                        </div>
                        <h1 className="text-3xl capitalize font-bold mb-4">{productData.name}</h1>
                        <HtmlContent
                            content={productData.description}
                            className="prose"
                        />
                        <div className="attributes mt-4 bg-[#f3f3eb] py-4 px-4">
                            <h2 className="text-[#867f54] font-semibold text-lg mb-3">
                                Product Attributes
                            </h2>

                            <div className="overflow-x-auto">
                                <table className="w-full border border-[#d1cfb8] text-[#867f54]">
                                    <tbody>
                                        {productData.attributes.map((item) => (
                                            <tr key={item.id} className="border-b border-[#d1cfb8]">
                                                <td className="px-3 py-2 font-semibold w-1/3">{item.attribute_name}</td>
                                                <td className="px-3 py-2">{item.attribute_value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <button className="bg-[#B2AC88] font-semibold block cursor-pointer mt-4 text-white px-6 py-2 hover:bg-[#867f54] transition">
                            Enquire Now
                        </button>
                        <span className="mt-3 text-xs block text-[#b2ac88]">** Image  Shown in Picture might Vary in real , Images are for Visual Purposes only</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
