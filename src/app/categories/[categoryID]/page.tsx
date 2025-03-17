import Card from "@/components/Card";
import { getProductsByCategoryId } from "@/helpers/products.helper";
import Link from "next/link";
import { Metadata } from 'next';

type Props = {
  params: { categoryID: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Add metadata generation if needed
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Category ${params.categoryID}`,
  };
}

// Use the correct Page component structure
export default async function Page({ params }: Props) {
  const products = await getProductsByCategoryId(params.categoryID);

  return (
    <div>
      {products.length > 0 ? (
        products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <Card {...product} />
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-600">No products found.</p>
      )}
    </div>
  );
}