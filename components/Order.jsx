import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CurrencyRupeeIcon } from "@heroicons/react/outline";

const Order = ({ order }) => {
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;
  return (
    <div className="grid md:grid-cols-4 md:gap-5">
      <div className="overflow-x-auto md:col-span-3">
        <div className="card  p-5">
          <h2 className="mb-2 text-lg">Shipping Address</h2>
          <div>
            {shippingAddress.fullName}, {shippingAddress.address},{" "}
            {shippingAddress.city}, {shippingAddress.postalCode},{" "}
            {shippingAddress.country}
          </div>
          {isDelivered ? (
            <div className="alert-success">Delivered at {deliveredAt}</div>
          ) : (
            <div className="alert-error">Not delivered</div>
          )}
        </div>

        <div className="card p-5">
          <h2 className="mb-2 text-lg">Payment Method</h2>
          <div>{paymentMethod}</div>
          {isPaid ? (
            <div className="alert-success">Paid at {paidAt}</div>
          ) : (
            <div className="alert-error">Not paid</div>
          )}
        </div>

        <div className="card overflow-x-auto p-5">
          <h2 className="mb-2 text-lg">Order Items</h2>
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="px-5 text-left">Item</th>
                <th className="    p-5 text-right">Quantity</th>
                <th className="  p-5 text-right">Price</th>
                <th className="p-5 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item) => (
                <tr key={item._id} className="border-b">
                  <td>
                    <Link href={`/product/${item.slug}`}>
                      <a className="flex items-center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        ></Image>
                        &nbsp;
                        {item.name}
                      </a>
                    </Link>
                  </td>
                  <td className=" p-5 text-right">{item.quantity}</td>
                  <td className="p-5 text-right">
                    <div className="flex justify-end items-center">
                      <CurrencyRupeeIcon className="h-5 w-5"></CurrencyRupeeIcon>
                      {item.price}
                    </div>
                  </td>
                  <td className="p-5 text-right ">
                    <div className="flex justify-end items-center">
                      <CurrencyRupeeIcon className="h-5 w-5"></CurrencyRupeeIcon>
                      {item.quantity * item.price}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div className="card  p-5">
          <h2 className="mb-2 text-lg">Order Summary</h2>
          <ul>
            <li>
              <div className="mb-2 flex justify-between">
                <div>Items</div>
                <div className="flex justify-end items-center">
                  <CurrencyRupeeIcon className="h-5 w-5"></CurrencyRupeeIcon>
                  {itemsPrice}
                </div>
              </div>
            </li>{" "}
            <li>
              <div className="mb-2 flex justify-between">
                <div>Tax</div>
                <div className="flex justify-end items-center">
                  <CurrencyRupeeIcon className="h-5 w-5"></CurrencyRupeeIcon>
                  {taxPrice}
                </div>
              </div>
            </li>
            <li>
              <div className="mb-2 flex justify-between">
                <div>Shipping</div>
                <div className="flex justify-end items-center">
                  <CurrencyRupeeIcon className="h-5 w-5"></CurrencyRupeeIcon>
                  {shippingPrice}
                </div>
              </div>
            </li>
            <li>
              <div className="mb-2 flex justify-between">
                <div>Total</div>
                <div className="flex justify-end items-center">
                  <CurrencyRupeeIcon className="h-5 w-5"></CurrencyRupeeIcon>
                  {totalPrice}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Order;
