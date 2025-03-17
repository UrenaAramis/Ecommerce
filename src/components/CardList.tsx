
import Card from "@/components/Card"
import { getProductsDB } from "@/helpers/products.helper";
import Link from "next/link"

const CardList = async () => {

    const productsToPreLoad = await getProductsDB();
    return (
        <div className="flex flex-wrap items-center justify-center gap-6">
      
            {
                productsToPreLoad && productsToPreLoad.map((product) => {
                    return (
                      <Link key={product.id} href={`/product/${product.id}`} > 
                        <Card key={product.id} {...product} />
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default CardList;