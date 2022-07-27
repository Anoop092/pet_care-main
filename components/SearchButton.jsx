import React, { useRef } from "react";
import { SearchCircleIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

const SearchButton = () => {
  const router = useRouter();
  const searchText = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?breed=${searchText.current.value}`);
  };

  return (
    <form className="mx-auto max-w-screen-md flex">
      <input type="text" ref={searchText} />
      <button
        type="submit"
        onClick={submitHandler}
        className="relative right-7 -z-1"
      >
        <SearchCircleIcon className="h-5 w-5"></SearchCircleIcon>
      </button>
    </form>
  );
};

export default SearchButton;
