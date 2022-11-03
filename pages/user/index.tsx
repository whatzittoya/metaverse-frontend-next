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
                          src="/img/login.jpg"
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
