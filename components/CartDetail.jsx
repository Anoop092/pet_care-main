import React from "react";
import { urlForThumbnail } from "../utils/image";
import { XCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Image from "next/image";
import { useGlobalContext } from "../utils/Store";
import { useRouter } from "next/router";

const CartDetail = ({ cartItems }) => {
  const { updateCartHandler, removeCartHandler } = useGlobalContext();
  const router = useRouter();
  return (
    <div className="grid md:grid-cols-4 md:gap-5">
      <div className="overflow-x-auto md:col-span-3">
        <table className="min-w-full">
          <thead className="border-b">
            <tr>
              <th className="px-5 text-left">Animal</th>
              <th className="px-5 text-right">Quantity</th>
              <th className="px-5 text-right">Price</th>
              <th className="px-5">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.slug.current} className="border-b">
                <td>
                  <Link href={`/products/${item.slug.current}`}>
                    <a className="flex items-center">
                      <Image
                        src={urlForThumbnail(item.image)}
                        alt={item.name}
                        width={50}
                        height={50}
                      ></Image>
                      &nbsp;
                      {item.name}
                    </a>
                  </Link>
                </td>
                <td className="p-5 text-right">
                  <select
                    value={item.quantity}
                    onChange={(e) => updateCartHandler(item, e.target.value)}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-5 text-right">${item.price}</td>
                <td className="p-5 text-center">
                  <button onClick={() => removeCartHandler(item)}>
                    <XCircleIcon className="h-5 w-5"></XCircleIcon>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card p-5">
        <ul>
          <li>
            <div className="pb-3">
              SubTotal ({cartItems.reduce((a, c) => a + c.quantity, 0)})
            </div>
            {""}${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
          </li>
          <li>
            <button
              className="primary-button"
              onClick={() => router.push("/shipping")}
            >
              Check out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CartDetail;
