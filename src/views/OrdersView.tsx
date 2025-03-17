'use client'
import { useAuth } from '@/context/AuthContext';
import { getOrders } from '@/helpers/orders.helper';
import { IOrder } from '@/types';
import React, { useEffect, useState } from 'react';

const OrdersView = () => {
  const { userData } = useAuth();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleGetOrders = async () => {
      if (!userData?.token) return;

      try {
        const response = await getOrders(userData.token);
        setOrders(response);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    handleGetOrders();
  }, [userData?.token]); 

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Your Orders
      </h2>

      {loading ? (
        <p className="flex flex-col items-center justify-center h-full text-gray-600 text-lg font-light text-center">
          Loading Orders...
        </p>
      ) : orders.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {orders.map((order) => {
            const total = order.products.reduce((sum, product) => sum + product.price, 0);

            return (
              <div
                key={order.id}
                className="flex flex-col p-5 min-h-[200px] bg-white border border-gray-100 shadow-md rounded-2xl"
              >
                <p className="text-lg font-semibold text-gray-800">
                  Order N°: {order.id}
                </p>
                <p className="text-sm text-gray-600">
                  Status: <span className="font-medium">{order.status.toUpperCase()}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(order.date).toLocaleDateString()}
                </p>

                <div className="mt-4 space-y-2 border-t border-gray-200 pt-3">
                  {order.products.map((product) => (
                    <div key={product.id} className="flex justify-between text-sm text-gray-700">
                      <span className="pr-2">{product.name}</span>
                      <span className="font-semibold">${product.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <p className="text-right text-gray-800 font-bold mt-3 border-t border-gray-200 pt-3">
                  Total: ${total.toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white flex flex-row gap-6 items-center p-8 border border-gray-100 shadow-md rounded-2xl">
          <p className="text-gray-600 text-lg font-light text-center">
            You don&apos;t have any orders yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrdersView;
