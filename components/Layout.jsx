import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../utils/Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Menu } from "@headlessui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import DropdownLink from "./DropdownLink";
const Layout = ({ children, title }) => {
  const { state, dispatch } = useGlobalContext();
  const [count, setCount] = useState(0);
  const { cart } = state;
  const { userInfo } = state;
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let num = cart.cartItems.reduce((sum, cur) => sum + cur.quantity, 0);
    setCount(num);
  }, [cart.cartItems, router]);
  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);
  const logoutClickHandler = () => {
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("cart");
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>{title ? `${title}-Pet Care` : "Pet Care"}</title>
        <meta name="description" content="the pet-zone for pet lovers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex flex-col min-h-screen justify-between">
        <header>
          <nav className=" flex h-12 shadow-md py-5 px-3 bg-blue-500 items-center justify-between">
            <Link href="/">
              <a className="text-xl text-white font-bold">PET ZONE</a>
            </Link>
            <div>
              <Link href="/cart">
                <a className="text-xl p-2 text-white">
                  Cart
                  {count > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {count}
                    </span>
                  )}
                </a>
              </Link>
              {user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-white">{user.name}</Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="order-history"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        href="#"
                        className="dropdown-link"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login">
                  <a className="text-xl p-2 text-white">Login</a>
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 items-center justify-center shadow-md">
          {" "}
          <p>Copyright &copy; pet-zone</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
