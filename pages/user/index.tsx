import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbars/IndexNavbar";

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
                          src="data:image/jpeg;base64,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"
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
