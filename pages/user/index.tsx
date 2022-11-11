import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbars/IndexNavbar";
import { endpoint } from "../../src/api/api-client";
function index() {
  const api = process.env.NEXT_PUBLIC_API;
  const [designs, setDesigns] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(`/api/getdesign`);
    setDesigns(data.data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar />
      <section className="pt-20">
        <div className="container mx-auto">
          <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Name
                </label>
                <label
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  placeholder="Username"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Description
                </label>
                <textarea
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                />
                <p className="text-red-500 text-xs italic">
                  Please choose a password.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                  type="button"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <div className="justify-center flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4 ">
              <div className="flex flex-wrap">
                {designs.map((design) => (
                  <div className="w-full lg:w-4/12 px-4">
                    <h5 className="text-xl font-semibold pb-4 text-center">
                      {design.name}
                    </h5>
                    <Link href={`/user/designer/${design.id}`}>
                      <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                        <img
                          alt="..."
                          className="align-middle border-none max-w-full h-auto rounded-lg"
                          src={
                            design.image
                              ? `${endpoint}assets/${design.image}`
                              : `${endpoint}assets/e4242ba9-b767-4b6c-9bea-015ea5a6ce56`
                          }
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default index;
