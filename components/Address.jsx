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

const Address = () => {
  // State variables to store form field values, fetched addresses, and editing state
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if editing or adding new address
    if (editingId) {
      // Update existing document in Firestore
      try {
        await updateDoc(doc(db, "addresses", editingId), {
          address,
          city,
          landmark,
          state,
          country,
        });
        console.log("Document with ID: ", editingId, " updated");
        setEditingId(null);
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    } else {
      // Add new document to Firestore
      try {
        const docRef = await addDoc(collection(db, "addresses"), {
          address,
          city,
          landmark,
          state,
          country,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }

    // Clear form fields
    setAddress("");
    setCity("");
    setLandmark("");
    setState("");
    setCountry("");
    fetchAddresses(); // Fetch updated addresses
  };

  // Function to fetch addresses from the database
  const fetchAddresses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "addresses"));
      const fetchedAddresses = [];
      querySnapshot.forEach((doc) => {
        fetchedAddresses.push({ id: doc.id, ...doc.data() });
      });
      setAddresses(fetchedAddresses);
    } catch (error) {
      console.error("Error fetching addresses: ", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Function to delete an address
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "addresses", id));
      console.log("Document with ID: ", id, " deleted");
      fetchAddresses(); // Fetch updated addresses after deletion
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  // Function to set editing mode and populate form fields with address data
  const handleEdit = (id) => {
    const addressToEdit = addresses.find((addr) => addr.id === id);
    if (addressToEdit) {
      setAddress(addressToEdit.address);
      setCity(addressToEdit.city);
      setLandmark(addressToEdit.landmark);
      setState(addressToEdit.state);
      setCountry(addressToEdit.country);
      setEditingId(id);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Address</h2>
      <p className="text-xl mb-4 font-light">Deluxe Room</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Address</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">City</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Landmark</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">State</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Country</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {editingId ? "Update" : "Submit"}
        </button>
      </form>
      <div>
        <h2 className="text-xl font-bold mb-4">Fetched Addresses</h2>
        <div>
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="bg-white p-4 rounded-md shadow-md mb-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">ADDRESS: {addr.address}</p>
                <p className="font-semibold">CITY: {addr.city}</p>
                <p className="font-semibold">LANDMARK: {addr.landmark}</p>
                <p className="font-semibold">STATE: {addr.state}</p>
                <p className="font-semibold">COUNTRY: {addr.country}</p>
              </div>
              <div>
                {/* Edit and delete buttons */}
                <button
                  onClick={() => handleEdit(addr.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(addr.id)}
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

export default Address;
