
import SingleProduct from "@/app/components/page/product/SingleProduct";
import LayoutPage from "@/app/components/ui/layout/layout";

export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/single/product/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        title: "Product Not Found",
        description: "Product does not exist",
      };
    }

    const product = await res.json();

    return {
      title: product.meta_title || product.name,
      description: product.meta_description || product.summary,
      keywords: product.meta_keyword || "",
      openGraph: {
        title: product.meta_title || product.name,
        description: product.meta_description || product.summary,
        images: [
          product.thumbnail
            ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${product.thumbnail}`
            : "",
        ],
      },
    };
  } catch (err) {
    console.error(err);
    return {
      title: "Product Not Found",
      description: "Product does not exist",
    };
  }
}

// --- Page Component (Server Component) ---
export default async function Page({ params }) {
  const { slug } = params;

  let product = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/single/product/${slug}`, {
      cache: "no-store",
    });

    if (res.ok) {
      product = await res.json();
    }
  } catch (err) {
    console.error(err);
  }

  if (!product) {
    return (
      <LayoutPage>
        <div className="text-center py-20">Product not found</div>
      </LayoutPage>
    );
  }

  return (
    <LayoutPage>
      <SingleProduct slug={slug} />
    </LayoutPage>
  );
}
