import { IProduct } from "@/types";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductsDB(): Promise<IProduct[]> {
  try {
    const response = await fetch(`${API_URL}/products`, {
      next: { revalidate: 1200 },
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid JSON response");
    }

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    return await response.json();
  } catch (error: unknown) {
    console.error("Error fetching products:", error);
    return []; // Devuelve un array vacío en caso de error
  }
}

export async function getProductsById(id: string): Promise<IProduct> {
  try {
    const products = await getProductsDB();
    const foundProduct = products.find((product) => product.id.toString() === id);
    
    if (!foundProduct) {
      throw new Error(`Product with ID ${id} not found`);
    }

    return foundProduct;
  } catch (error) {
    console.error("Error in getProductsById:", error);
   
    // TypeScript necesita un valor de retorno, aunque nunca llegará aquí
    throw error; // Alternativa a return {} as IProduct;
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
