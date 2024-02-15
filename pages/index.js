import Address from "@/components/Address";
import AriDetails from "@/components/AriDetails";
import Attribut from "@/components/Attribut";
import Description from "@/components/Description";
import React, { useState } from "react";

const Index = () => {
  const [common, setCommon] = useState("address");

  return (
    <div>
      <div className="bg-white shadow-md p-4">
        <div className="flex gap-8">
          <button
            onClick={(e) => setCommon("address")}
            className="cursor-pointer font-bold relative text-gray-800 px-4 py-2 rounded-md hover:bg-yellow-200 hover:text-black transition duration-300"
          >
            Address
            <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform translate-y-1 transition-transform duration-300"></div>
          </button>
          <button
            onClick={(e) => setCommon("aridetails")}
            className="cursor-pointer font-bold relative text-gray-800 px-4 py-2 rounded-md hover:bg-yellow-200 hover:text-black transition duration-300"
          >
            AriDetails
            <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform translate-y-1 transition-transform duration-300"></div>
          </button>

          <button
            onClick={(e) => setCommon("description")}
            className="cursor-pointer font-bold relative text-gray-800 px-4 py-2 rounded-md hover:bg-yellow-200 hover:text-black transition duration-300"
          >
            Description
            <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform translate-y-1 transition-transform duration-300"></div>
          </button>
          <button
            onClick={(e) => setCommon("attribute")}
            className="cursor-pointer font-bold relative text-gray-800 px-4 py-2 rounded-md hover:bg-yellow-200 hover:text-black transition duration-300"
          >
            Attribute
            <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform translate-y-1 transition-transform duration-300"></div>
          </button>
        </div>
      </div>

      {common === "address" && <Address />}
      {common === "aridetails" && <AriDetails />}
      {common === "description" && <Description />}
      {common === "attribute" && <Attribut />}
    </div>
  );
};

export default Index;
