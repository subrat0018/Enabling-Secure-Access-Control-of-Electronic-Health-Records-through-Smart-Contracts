import React, { useContext } from "react";
import { useState } from "react";
import Web3Context from "../contexts";
import { enroll } from "../contexts/useContract/writeContract";
import { setPatient } from "../contexts/useContract/writeContract";
const EnrollmentForm = () => {
    const {account, _EnrollmentContract, _PatientOrgContract} = useContext(Web3Context);
  const [form, setForm] = useState({
    adharNo: "",
    name: "",
    address: ""
  });
  return (
    <div className="flex justify-center w-full ">
      <form className=" w-1/2 mt-10">
        <div class="relative z-0 w-full mb-6 group text-2xl">
          <input
            name="floating_email"
            id="floating_email"
            class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={(e)=>{
                setForm({...form, adharNo: e.target.value})
            }}
          />
          <label
            for="floating_email"
            class=" text-xl peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Aadhar Number
          </label>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={(e)=>{
                setForm({...form, name: e.target.value});
            }}
            />
            <label
              for="floating_first_name"
              class="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder={`${account.currentAccount}`}
              required
              onChange={(e)=>{
                setForm({...form, address: e.target.value})
            }}
            />
            <label
              for="floating_last_name"
              class="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address
            </label>
          </div>
        </div>
        <button
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e)=>{
            e.preventDefault();
            // console.log(account)
           enroll(_EnrollmentContract, account.currentAccount, form.name,form.address, form.adharNo);
           setPatient(_PatientOrgContract, account.currentAccount, form.address)
          }}
        >
          Enroll
        </button>
      </form>
    </div>
  );
};
export default EnrollmentForm;
