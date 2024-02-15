import React, { useState, useEffect } from "react";
import { db } from "../config/FirebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
const Attribut = () => {
  // State variables to store checkbox values
  const [attributes, setAttributes] = useState({
    airCondition: { yes: false, no: false },
    wifi: { yes: false, no: false },
    tv: { yes: false, no: false },
    refrigerator: { yes: false, no: false },
    roomService: { yes: false, no: false },
    spaAndMassages: { yes: false, no: false },
    hotTub: { yes: false, no: false },
    laundry: { yes: false, no: false },
  });
  const [fetchedAttributes, setFetchedAttributes] = useState(null);
  // Function to handle checkbox changes
  const handleCheckboxChange = (attribute, option) => {
    setAttributes({
      ...attributes,
      [attribute]: {
        ...attributes[attribute],
        [option]: !attributes[attribute][option],
      },
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add document to Firestore collection
      const docRef = await addDoc(collection(db, "attributes"), {
        ...attributes,
      });
      console.log("Document written with ID: ", docRef.id);
      // Clear form fields
      setAttributes({
        airCondition: { yes: false, no: false },
        wifi: { yes: false, no: false },
        tv: { yes: false, no: false },
        refrigerator: { yes: false, no: false },
        roomService: { yes: false, no: false },
        spaAndMassages: { yes: false, no: false },
        hotTub: { yes: false, no: false },
        laundry: { yes: false, no: false },
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const fetchAttributes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "attributes"));
      const fetchedData = querySnapshot.docs.map((doc) => doc.data());
      setFetchedAttributes(fetchedData[0]); // Assuming there is only one document in the collection
    } catch (error) {
      console.error("Error fetching attribute data: ", error);
    }
  };

  // Fetch attribute data when component mounts
  useEffect(() => {
    fetchAttributes();
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <p className="text-xl font-bold mb-4">Attribute</p>
      <p className="text-xl mb-4 font-light">Deluxe Room</p>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-evenly">
          {/* First Column */}
          <div>
            {/* Air Condition */}
            <div className="flex items-center mb-4">
              <div className=" w-28">
                <p className="font-semibold mr-4">Air Condition</p>
              </div>
              <div className="ml-8 flex">
                <label className="inline-block mr-2">
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={attributes.airCondition.yes}
                    onChange={() => handleCheckboxChange("airCondition", "yes")}
                  />
                  Yes
                </label>
                <label className="inline-block">
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={attributes.airCondition.no}
                    onChange={() => handleCheckboxChange("airCondition", "no")}
                  />
                  No
                </label>
              </div>
            </div>

            {/* Wi-Fi */}
            <div className="flex items-center mb-4">
              <div className=" w-28">
                <p className="font-semibold mr-4">Wi-Fi</p>
              </div>
              <div className="ml-8 flex">
                <label className="inline-block mr-2">
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={attributes.wifi.yes}
                    onChange={() => handleCheckboxChange("wifi", "yes")}
                  />
                  Yes
                </label>
                <label className="inline-block">
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={attributes.wifi.no}
                    onChange={() => handleCheckboxChange("wifi", "no")}
                  />
                  No
                </label>
              </div>
            </div>

            {/* Tv */}
            <div className="flex items-center mb-4">
              <div className=" w-28">
                <p className="font-semibold mr-4">Tv</p>
              </div>
              <div className="ml-8 flex">
                <label className="inline-block mr-2">
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={attributes.tv.yes}
                    onChange={() => handleCheckboxChange("tv", "yes")}
                  />
                  Yes
                </label>
                <label className="inline-block">
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={attributes.tv.no}
                    onChange={() => handleCheckboxChange("tv", "no")}
                  />
                  No
                </label>
              </div>
            </div>

            {/* Refrigerator */}
            <div className="flex items-center mb-4">
              <div className=" w-28">
                <p className="font-semibold mr-4">Refrigerator</p>
              </div>
              <div className="ml-8 flex">
                <label className="inline-block mr-2">
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={attributes.refrigerator.yes}
                    onChange={() => handleCheckboxChange("refrigerator", "yes")}
                  />
                  Yes
                </label>
                <label className="inline-block">
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={attributes.refrigerator.no}
                    onChange={() => handleCheckboxChange("refrigerator", "no")}
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          {/* Second Column */}
          <div>
            {/* Room Service */}
            <div className="flex items-center mb-4">
              <div className=" w-28">
                <p className="font-semibold mr-4">Room Service</p>
              </div>
              <div className="ml-8 flex">
                <label className="inline-block mr-2">
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={attributes.roomService.yes}
                    onChange={() => handleCheckboxChange("roomService", "yes")}
                  />
                  Yes
                </label>
                <label className="inline-block">
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={attributes.roomService.no}
                    onChange={() => handleCheckboxChange("roomService", "no")}
                  />
                  No
                </label>
              </div>
            </div>

            {/* Spa And Massages */}
            <div className="flex items-center mb-4">
              <div className=" w-28">
                <p className="font-semibold mr-4">Spa And Massages</p>
              </div>
              <div className="ml-8 flex">
                <label className="inline-block mr-2">
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={attributes.spaAndMassages.yes}
                    onChange={() =>
                      handleCheckboxChange("spaAndMassages", "yes")
                    }
                  />
                  Yes
                </label>
                <label className="inline-block">
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={attributes.spaAndMassages.no}
                    onChange={() =>
                      handleCheckboxChange("spaAndMassages", "no")
                    }
                  />
                  No
                </label>
              </div>
            </div>

            {/* Hot Tub */}
            <div className="flex items-center mb-4">
              <div className=" w-28">
                <p className="font-semibold mr-4">Hot Tub</p>
              </div>
              <div className="ml-8 flex">
                <label className="inline-block mr-2">
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={attributes.hotTub.yes}
                    onChange={() => handleCheckboxChange("hotTub", "yes")}
                  />
                  Yes
                </label>
                <label className="inline-block">
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={attributes.hotTub.no}
                    onChange={() => handleCheckboxChange("hotTub", "no")}
                  />
                  No
                </label>
              </div>
            </div>

            {/* Laundry */}
            <div className="flex items-center mb-4">
              <div className=" w-28">
                <p className="font-semibold mr-4">Laundry</p>
              </div>
              <div className="ml-8 flex">
                <label className="inline-block mr-2">
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={attributes.laundry.yes}
                    onChange={() => handleCheckboxChange("laundry", "yes")}
                  />
                  Yes
                </label>
                <label className="inline-block">
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={attributes.laundry.no}
                    onChange={() => handleCheckboxChange("laundry", "no")}
                  />
                  No
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      <h2 className="text-xl font-bold mb-2">Fetched Attribute Data</h2>
      <div className="mt-4 flex flex-wrap">
        {fetchedAttributes ? (
          Object.entries(fetchedAttributes).map(([attribute, options]) => (
            <div
              key={attribute}
              className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden m-4"
            >
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{attribute}</div>
                <ul>
                  {Object.entries(options).map(([option, value]) => (
                    <li key={option} className="flex justify-between">
                      <span>{option}</span>
                      <span
                        className={value ? "text-green-500" : "text-red-500"}
                      >
                        {value.toString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>No attribute data available</p>
        )}
      </div>
    </div>
  );
};

export default Attribut;
