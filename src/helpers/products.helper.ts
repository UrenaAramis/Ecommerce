import { IProduct } from "@/types";
import { notFound } from "next/navigation"; 

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductsDB() {
  try {
    const response = await fetch(`${API_URL}/products`, {
      next: { revalidate: 1200 },
    });

    const products: IProduct[] = await response.json();
    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getProductsById(id: string) {
  try {
    const products = await getProductsDB();
    const foundProduct = products.find((product) => product.id.toString() === id);
    
    if (!foundProduct) {
      notFound()
    }

    return foundProduct;
  } catch (error: any) {
    notFound()
  }
}

export async function getProductsByCategoryId(categoryId: string) {
  try {
    const products: IProduct[] = await getProductsDB();
    let productsFiltered: IProduct[] = products.filter((product) => product.categoryId.toString() === categoryId);
    
    return productsFiltered;
  } catch (error: any) {
    throw new Error(error);
  }
}

// export async function getFirstProductName(){
//   try {
//     const products: IProduct[] = await getProductsDB();

//     if(products.length === 0){
//       throw new Error("No products found");}


//       return products[0].name;
//   } catch (error) {
//     console.error("Error getting first product name:", error);
//     throw new Error("Error getting first product name");
//   }
// }
