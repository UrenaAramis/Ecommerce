import Card from "@/components/Card";
import { getProductsByCategoryId } from "@/helpers/products.helper";
import Link from "next/link";

const CategoryPage = async ({
  params,
}: {params : Promise<{categoryID: string}>}) => {
  const { categoryID } = await params;
  const products = await getProductsByCategoryId(categoryID);

  return (
    <div>
      {products &&
        products.map((product) => {
          return (
            <Link key={product.id} href={`/product/${product.id}`}>
              <Card key={product.id} {...product} />
            </Link>
          );
        })}
    </div>
  );
};

export default CategoryPage;
