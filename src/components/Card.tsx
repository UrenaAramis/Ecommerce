import { IProduct } from "@/types";
import React from "react";

const Card: React.FC<IProduct> = ({ name, image, price }) => {
    return (
        
<div 
  className="max-w-[350px] w-full h-[350px] flex flex-col items-center bg-white border  border-gray-100 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl  m-2 md:flex-row p-4 transform hover:scale-105 transition duration-300 ease-in-out"
>
<img
        className="w-full max-h-[200px] md:max-h-[250px] md:w-48 object-contain rounded-t-lg md:rounded-none md:rounded-l-lg aspect-auto"
        src={image}
        alt={`Product image for ${name}`}
      />
    <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-300 text-">{name}</h5>
        <p className="mb-3 font-semibold text-gray-700">Price ${price}</p>
    </div>
</div>

    )
}

export default Card;


