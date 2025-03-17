"use client";

import { useAuth } from "@/context/AuthContext";
import { IProduct } from "@/types";
import React from "react";
import Swal, { SweetAlertIcon } from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const ProductDetailView: React.FC<IProduct> = ({
  name,
  id,
  description,
  stock,
  price,
  image,
  categoryId,
}) => {
  const { userData } = useAuth();
  

  const showAlert = (title: string, text: string, icon: SweetAlertIcon) => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: "OK",
      customClass: {
        popup: "bg-black text-white rounded-xl shadow-lg",
        title: "text-lg font-bold text-white",
        confirmButton:
          "bg-gray-700 hover:bg-gray-600 text-white rounded-xl px-4 py-2",
      },
    });
  };

  const handleAddToCart = () => {
    if (!userData?.token) {
      showAlert("Not logged in", "You need to be logged in to add to cart", "warning");
    } else {
      const cart: IProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");
      const productExist = cart.some((product: IProduct) => product.id === id);

      if (productExist) {
        showAlert("Already in cart", "This product is already in your cart", "info");
        return;
      } else {
        cart.push({ name, id, description, stock, price, image, categoryId });
        localStorage.setItem("cart", JSON.stringify(cart));

        showAlert("Success", "Product added to cart successfully", "success");
      } 
    }
  };

  return (
    <div className="max-w-[350px] w-full h-auto flex flex-col items-center bg-white border border-gray-100 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg m-2 md:flex-row p-6">
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src={image}
        alt={`${name} - Product Image - ${description}`}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-300">{name}</h1>
        <p className="mb-3 font-normal text-gray-700">{description}</p>
        <p className="mb-3 font-bold text-gray-700">Stock: {stock}</p>
        <p className="mb-3 font-bold text-gray-700">Price: ${price}</p>
        <button
          className="rounded-xl bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailView;
