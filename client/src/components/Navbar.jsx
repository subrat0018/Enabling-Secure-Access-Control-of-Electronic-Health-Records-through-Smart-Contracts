import React, { useContext } from "react";
import Button from "./Button";
import Web3Context from "../contexts";

const Navbar = () => {
  const { connectWallet, account } = useContext(Web3Context);

  return (
    <nav class="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a 
        href="/"
        class="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="h-8"
            alt="Flowbite Logo"
          />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            MediChain
          </span>
        </a>
        {account.currentAccount == null ? (
         <button onClick={connectWallet}
         type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
            + Connect Wallet
            </button>
        ) : (
          <div className="w-1/3 flex justify-center items-center mr-24 text-black">
            {" "}
            Hey,{" "}
            {`${String(account.currentAccount).slice(0, 9)}...${String(
              account.currentAccount
            ).slice(String(account.currentAccount).length - 9)}`}
          </div>
        )}
        {/* <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        ></div> */}
      </div>
    </nav>
  );
};

export default Navbar;
