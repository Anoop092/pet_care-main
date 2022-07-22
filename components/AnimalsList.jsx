import Link from "next/link";
import React from "react";
import { urlForThumbnail } from "../utils/image";
import { useGlobalContext } from "../utils/Store";

const AnimalsList = ({ animal }) => {
  const { slug, name, price, image, breed } = animal;
  const { addToCartHandler } = useGlobalContext();

  return (
    <div className="card">
      <Link href={`/animals/${slug.current}`}>
        <a>
          <img
            src={urlForThumbnail(image)}
            alt={breed}
            className="rounded shadow"
          />
        </a>
      </Link>
      <div className="flex flex-col justify-center items-center">
        <Link href={`animals/${slug.current}`}>
          <a className="text-lg">{name.toUpperCase()}</a>
        </Link>
        <p className="text-gray-700 text-xl py-2">
          <span className="text-blue-500">Breed</span> : {breed}{" "}
        </p>
        <p className="text-gray-700 text-xl py-2">
          <span className="text-blue-500">Price</span> : {price}Rs
        </p>
        <button
          className="w-full rounded-lg bg-orange-500 py-2 text-white text-lg shadow outline-none hover:bg-orange-300 "
          type="btn"
          onClick={() => addToCartHandler(animal)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default AnimalsList;
