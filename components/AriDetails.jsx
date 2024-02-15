import React, { useEffect, useState } from "react";
import { db } from "../config/FirebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const AriDetails = () => {
  // State variables to store form field values and fetched arrival details
  const [arrivalDate, setArrivalDate] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [arrivalDetails, setArrivalDetails] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Function to handle form submission or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        // Update document in Firestore collection
        await updateDoc(doc(db, "arrivalDetails", editId), {
          arrivalDate,
          arrivalTime,
          flightNumber,
        });
        console.log("Document with ID: ", editId, " updated");
      } else {
        // Add document to Firestore collection
        const docRef = await addDoc(collection(db, "arrivalDetails"), {
          arrivalDate,
          arrivalTime,
          flightNumber,
        });
        console.log("Document written with ID: ", docRef.id);
      }
      fetchArrivalDetails(); // Fetch updated arrival details after submission/update
    } catch (error) {
      console.error("Error adding/updating document: ", error);
    }

    // Clear form fields and reset edit mode
    setArrivalDate("");
    setArrivalTime("");
    setFlightNumber("");
    setEditMode(false);
    setEditId(null);
  };

  // Function to fetch arrival details from the database
  const fetchArrivalDetails = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "arrivalDetails"));
      const fetchedArrivalDetails = [];
      querySnapshot.forEach((doc) => {
        fetchedArrivalDetails.push({ id: doc.id, ...doc.data() });
      });
      setArrivalDetails(fetchedArrivalDetails);
    } catch (error) {
      console.error("Error fetching arrival details: ", error);
    }
  };

  // Fetch arrival details when component mounts
  useEffect(() => {
    fetchArrivalDetails();
  }, []);

  // Function to delete an arrival detail
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "arrivalDetails", id));
      console.log("Document with ID: ", id, " deleted");
      fetchArrivalDetails(); // Fetch updated arrival details after deletion
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  // Function to set form fields for editing
  const handleEdit = (detail) => {
    setArrivalDate(detail.arrivalDate);
    setArrivalTime(detail.arrivalTime);
    setFlightNumber(detail.flightNumber);
    setEditMode(true);
    setEditId(detail.id);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Arrival Details</h2>
      <p className="text-xl mb-4 font-light">Deluxe Room</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Arrival Date</label>
          <input
            type="date"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Arrival Time</label>
          <input
            type="time"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Flight Number</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {editMode ? "Update" : "Submit"}
        </button>
      </form>
      <div>
        <h2 className="text-xl font-bold mb-4">Fetched Addresses</h2>
        <div>
          {arrivalDetails.map((detail) => (
            <div
              key={detail.id}
              className="bg-white p-4 rounded-md shadow-md mb-4"
            >
              <p className="font-semibold">
                Arrival Date: {detail.arrivalDate}
              </p>
              <p className="font-semibold">
                Arrival Time: {detail.arrivalTime}
              </p>
              <p className="font-semibold">
                Flight Number: {detail.flightNumber}
              </p>
              <div>
                {/* Edit and delete buttons */}
                <button
                  onClick={() => handleEdit(detail)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(detail.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AriDetails;
