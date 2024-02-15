import React, { useState, useEffect } from "react";
import { db } from "../config/FirebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const Description = () => {
  // State variables to store form field values, fetched hotel details, and edit mode
  const [hotelDescription, setHotelDescription] = useState("");
  const [airportHotel, setAirportHotel] = useState({
    name: "",
    distance: "",
    timing: "",
  });
  const [busStandHotel, setBusStandHotel] = useState({
    name: "",
    distance: "",
    timing: "",
  });
  const [railwayStationHotel, setRailwayStationHotel] = useState({
    name: "",
    distance: "",
    timing: "",
  });
  const [hotels, setHotels] = useState([]);
  const [editMode, setEditMode] = useState(false); // Edit mode state

  // Function to handle form submission or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if the hotel exists in edit mode
      const existingHotel = hotels.find(
        (hotel) => hotel.hotelDescription === hotelDescription
      );
      if (existingHotel) {
        // Update document in Firestore collection
        await updateDoc(doc(db, "hotels", existingHotel.id), {
          hotelDescription,
          airportHotel,
          busStandHotel,
          railwayStationHotel,
        });
        console.log("Document updated");
      } else {
        // Add document to Firestore collection
        await addDoc(collection(db, "hotels"), {
          hotelDescription,
          airportHotel,
          busStandHotel,
          railwayStationHotel,
        });
        console.log("Document added");
      }
      fetchHotelDetails(); // Fetch updated hotel details after submission/update
    } catch (error) {
      console.error("Error adding/updating document: ", error);
    }

    // Clear form fields and exit edit mode
    setHotelDescription("");
    setAirportHotel({ name: "", distance: "", timing: "" });
    setBusStandHotel({ name: "", distance: "", timing: "" });
    setRailwayStationHotel({ name: "", distance: "", timing: "" });
    setEditMode(false);
  };

  // Function to fetch hotel details from the database
  const fetchHotelDetails = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "hotels"));
      const fetchedHotels = [];
      querySnapshot.forEach((doc) => {
        fetchedHotels.push({ id: doc.id, ...doc.data() });
      });
      setHotels(fetchedHotels);
    } catch (error) {
      console.error("Error fetching hotel details: ", error);
    }
  };

  // Fetch hotel details when component mounts
  useEffect(() => {
    fetchHotelDetails();
  }, []);

  // Function to delete a hotel detail
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "hotels", id));
      console.log("Document deleted");
      fetchHotelDetails(); // Fetch updated hotel details after deletion
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  // Function to set form fields for editing
  const handleEdit = (hotel) => {
    setHotelDescription(hotel.hotelDescription);
    setAirportHotel(hotel.airportHotel);
    setBusStandHotel(hotel.busStandHotel);
    setRailwayStationHotel(hotel.railwayStationHotel);
    setEditMode(true); // Enter edit mode
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Hotel Description</h2>
      <p className="text-xl mb-4 font-light">Deluxe Room</p>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        {/* Hotel Description */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Hotel Description</label>
          <textarea
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            rows="4"
            value={hotelDescription}
            onChange={(e) => setHotelDescription(e.target.value)}
            required
          ></textarea>
        </div>
        {/* Hotel Near Airport */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Hotel Near Airport</label>
          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            className="w-full mb-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            value={airportHotel.name}
            onChange={(e) =>
              setAirportHotel({ ...airportHotel, name: e.target.value })
            }
            required
          />
          {/* Distance */}
          <input
            type="text"
            placeholder="Distance"
            className="w-full mb-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            value={airportHotel.distance}
            onChange={(e) =>
              setAirportHotel({ ...airportHotel, distance: e.target.value })
            }
            required
          />
          {/* Timing */}
          <input
            type="text"
            placeholder="Timing"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            value={airportHotel.timing}
            onChange={(e) =>
              setAirportHotel({ ...airportHotel, timing: e.target.value })
            }
            required
          />
        </div>
        {/* Hotel Near Bus Stand */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Hotel Near Bus Stand
          </label>
          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            className="w-full mb-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            value={busStandHotel.name}
            onChange={(e) =>
              setBusStandHotel({ ...busStandHotel, name: e.target.value })
            }
            required
          />
          {/* Distance */}
          <input
            type="text"
            placeholder="Distance"
            className="w-full mb-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            value={busStandHotel.distance}
            onChange={(e) =>
              setBusStandHotel({ ...busStandHotel, distance: e.target.value })
            }
            required
          />
          {/* Timing */}
          <input
            type="text"
            placeholder="Timing"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            value={busStandHotel.timing}
            onChange={(e) =>
              setBusStandHotel({ ...busStandHotel, timing: e.target.value })
            }
            required
          />
        </div>
        {/* Hotel Near Railway Station */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Hotel Near Railway Station
          </label>
          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            className="w-full mb-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            value={railwayStationHotel.name}
            onChange={(e) =>
              setRailwayStationHotel({
                ...railwayStationHotel,
                name: e.target.value,
              })
            }
            required
          />
          {/* Distance */}
          <input
            type="text"
            placeholder="Distance"
            className="w-full mb-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            value={railwayStationHotel.distance}
            onChange={(e) =>
              setRailwayStationHotel({
                ...railwayStationHotel,
                distance: e.target.value,
              })
            }
            required
          />
          {/* Timing */}
          <input
            type="text"
            placeholder="Timing"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            value={railwayStationHotel.timing}
            onChange={(e) =>
              setRailwayStationHotel({
                ...railwayStationHotel,
                timing: e.target.value,
              })
            }
            required
          />
        </div>
        {/* Conditional rendering for submit/update button based on edit mode */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {editMode ? "Update" : "Submit"}
        </button>
      </form>
      {/* Fetched hotel details */}
      <div>
        <h2 className="text-xl font-bold mt-8 mb-4">Fetched Hotel Details</h2>
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white p-4 rounded-md shadow-md mb-4"
          >
            {/* Hotel Description */}
            <p className="font-semibold">
              Hotel Description: {hotel.hotelDescription}
            </p>
            {/* Hotel Near Airport */}
            <p className="font-semibold">Hotel Near Airport:</p>
            <div>
              <p className="font-light">Name: {hotel.airportHotel.name}</p>
              <p className="font-light">
                Distance: {hotel.airportHotel.distance}
              </p>
              <p className="font-light">Timing: {hotel.airportHotel.timing}</p>
            </div>
            {/* Hotel Near Bus Stand */}
            <p className="font-semibold">Hotel Near Bus Stand:</p>
            <div>
              <p className="font-light">Name: {hotel.busStandHotel.name}</p>
              <p className="font-light">
                Distance: {hotel.busStandHotel.distance}
              </p>
              <p className="font-light">Timing: {hotel.busStandHotel.timing}</p>
            </div>
            {/* Hotel Near Railway Station */}
            <p className="font-semibold">Hotel Near Railway Station:</p>
            <div>
              <p className="font-light">
                Name: {hotel.railwayStationHotel.name}
              </p>
              <p className="font-light">
                Distance: {hotel.railwayStationHotel.distance}
              </p>
              <p className="font-light">
                Timing: {hotel.railwayStationHotel.timing}
              </p>
            </div>
            {/* Edit and delete buttons */}
            <div>
              <button
                onClick={() => handleEdit(hotel)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(hotel.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Description;
