"use client";

import { useAuth } from "@/context/AuthContext";
import { createOrder } from "@/helpers/orders.helper";
import { IProduct } from "@/types";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const CartView = () => {
  const { userData } = useAuth();
  const [cart, setCart] = useState<IProduct[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const storedCart: IProduct[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    if (storedCart) {
      let totalCart = 0;
      storedCart.forEach((product) => {
        totalCart += product.price;
      });
      setTotal(totalCart);
      setCart(storedCart);
    }
  }, []);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      Swal.fire({
        title: "Your cart is empty",
        text: "Please add products before checking out.",
        icon: "warning",
        confirmButtonText: "OK",
        customClass: {
          popup: "bg-black text-white rounded-xl shadow-lg",
          title: "text-lg font-bold text-white",
          confirmButton:
            "bg-gray-700 hover:bg-gray-600 text-white rounded-xl px-4 py-2",
        },
      });
      return;
    }
    Swal.fire({
      title: "Are you sure you want to checkout?",
      text: "You can still add products to your cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Checkout",
      cancelButtonText: "No, Keep Shopping",
      customClass: {
        popup: "bg-black text-white rounded-xl shadow-lg",
        title: "text-lg font-bold text-white",
        confirmButton:
          "bg-gray-700 hover:bg-gray-600 text-white rounded-xl px-4 py-2",
        cancelButton:
          "bg-gray-500 hover:bg-gray-400 text-white rounded-xl px-4 py-2",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const idProducts = cart.map((product) => product.id);
        await createOrder(userData?.token!, idProducts);
        localStorage.setItem("cart", "[]");
        setCart([]);
        setTotal(0);
      }
    });
  };

  const handleRemoveItem = (id: number) => {
    Swal.fire({
      title: "Are you sure you want to remove this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "No, Keep It",
      customClass: {
        popup: "bg-black text-white rounded-xl shadow-lg",
        title: "text-lg font-bold text-white",
        confirmButton:
          "bg-gray-700 hover:bg-gray-600 text-white rounded-xl px-4 py-2",
        cancelButton:
          "bg-gray-500 hover:bg-gray-400 text-white rounded-xl px-4 py-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = cart.filter((product) => product.id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);

        let newTotal = 0;
        updatedCart.map((product) => {
          newTotal += product.price;
        });

        setTotal(newTotal);

        Swal.fire({
          title: "Removed",
          text: "Product was successfully removed from the cart.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            popup: "bg-black text-white rounded-xl shadow-lg",
            title: "text-lg font-bold text-white",
            confirmButton:
              "bg-gray-700 hover:bg-gray-600 text-white rounded-xl px-4 py-2",
          },
        });
      }
    });
  };

  return (
    <div className="bg-white flex flex-row gap-6 items-center p-8 border border-gray-100 shadow-md rounded-2xl">
      <div className="flex flex-col w-full max-w-lg gap-4">
        {cart.length ? (
          cart.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center p-4 bg-white border rounded-2xl gap-4"
            >
              <img src={product.image} alt={product.name} className="w-20 h-23" />
              <p className="text-gray-800 font-medium">{product.name}</p>
              <p className="text-gray-700 font-semibold">${product.price}</p>
              <button
                onClick={() => handleRemoveItem(product.id)}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-500"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg font-light text-center">
            You don't have products added to your cart yet 😔
          </p>
        )}
      </div>
      {cart.length > 0 && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-800 text-lg font-semibold">Total: ${total}</p>
          <button
            onClick={handleCheckout}
            className="px-6 py-2 bg-black text-white font-semibold rounded-2xl hover:bg-gray-500 transition-colors"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartView;
