import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createOrder(token: string, products: number[]) {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ products }),
    });

    if (response.ok) {
      Swal.fire({
        title: "Success",
        text: "Order created successfully",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          popup: "bg-black text-white rounded-xl shadow-xl",
          title: "text-lg font-bold text-white",
          confirmButton:
            "bg-gray-700 hover:bg-gray-600 text-white rounded-xl px-4 py-2",
        },
      });
      return response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error creating order");
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    Swal.fire({
      title: "Error",
      text: `There was an issue creating the order: ${errorMessage}`,
      icon: "error",
      confirmButtonText: "OK",
      customClass: {
        popup: "bg-black text-white rounded-xl shadow-lg",
        title: "text-lg font-bold text-white",
        confirmButton:
          "bg-gray-700 hover:bg-gray-600 text-white rounded-xl px-4 py-2",
      },
    });
    throw error;
  }
}

export async function getOrders(token: string) {
  try {
    const response = await fetch(`${API_URL}/users/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (response.ok) {
      return response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error fetching orders");
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    Swal.fire({
      title: "Error",
      text: `An error occurred while fetching orders: ${errorMessage}`,
      icon: "error",
      confirmButtonText: "OK",
      customClass: {
        popup: "bg-black text-white rounded-xl shadow-lg",
        title: "text-lg font-bold text-white",
        confirmButton:
          "bg-gray-700 hover:bg-gray-600 text-white rounded-xl px-4 py-2",
      },
    });
    throw error;
  }
}
