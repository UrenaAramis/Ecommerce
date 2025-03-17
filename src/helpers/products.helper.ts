import { IProduct } from "@/types";
import { notFound } from "next/navigation"; 

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductsDB(): Promise<IProduct[]> {
  try {
    const response = await fetch(`${API_URL}/products`, {
      next: { revalidate: 1200 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return await response.json();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    throw new Error(errorMessage);
  }
}

export async function getProductsById(id: string): Promise<IProduct> {
  try {
    const products = await getProductsDB();
    const foundProduct = products.find((product) => product.id.toString() === id);
    
    if (!foundProduct) {
      notFound();
    }

    return foundProduct;
  } catch {
    notFound();
    
  }
}

export async function getProductsByCategoryId(categoryId: string): Promise<IProduct[]> {
  try {
    const products = await getProductsDB();
    return products.filter((product) => product.categoryId.toString() === categoryId);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    throw new Error(errorMessage);
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
