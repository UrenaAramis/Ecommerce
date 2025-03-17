import Card from "@/components/Card";
import { getProductsByCategoryId } from "@/helpers/products.helper";
import Link from "next/link";

interface CategoryPageProps {
  params: { categoryID: string };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const products = await getProductsByCategoryId(params.categoryID);

  return (
    <div>
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <Card {...product} />
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
