import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import InquiryForm from './InquiryForm';

const CarsShowcase = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);


  useEffect(() => {
    const fetchCars = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'cars'));
        const carsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCars(carsList);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {!selectedCar && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <div
              key={car.id}
              onClick={() => setSelectedCar(car)}
              className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
  src={car.imageUrls?.[0]} // use the first image from the imageUrls array
  alt={`${car.make} ${car.model}`}
  className="w-full h-48 object-cover"
/>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {car.make} {car.model}
                </h3>
                <div className="space-y-1 mb-4">
                  <p className="text-2xl font-bold text-purple-600">
                  {car.price ? `${Number(car.price).toLocaleString()}$` : 'Price on Request'}


                  </p>
                  <p className="text-gray-600">Mileage: {car.mileage} mi</p>
                  <p className="text-gray-600">Year: {car.year}</p>
                </div>
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  View more
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

{selectedCar && (
  <div className="bg-black rounded-2xl p-6 shadow-lg max-w-4xl mx-auto text-white">
    <button
      onClick={() => {
        setSelectedCar(null);
        setSelectedImage(null);
      }}
      className="mb-4 text-indigo-400 font-semibold hover:underline"
    >
      ← Back to all cars
    </button>

    <h2 className="text-3xl font-bold mb-4">
      {selectedCar.make} {selectedCar.model}
    </h2>

    {/* Expanded Image View */}
    <img
      src={selectedImage || selectedCar.imageUrls?.[0]}
      alt={`${selectedCar.make} ${selectedCar.model}`}
      className="w-full max-h-[400px] object-contain rounded mb-6 bg-white"
    />

    {/* Thumbnails */}
    {selectedCar.imageUrls?.length > 1 && (
      <div className="flex gap-4 overflow-x-auto mb-6">
        {selectedCar.imageUrls.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumbnail ${idx + 1}`}
            onClick={() => setSelectedImage(img)}
            className={`w-32 h-24 object-cover rounded cursor-pointer transition duration-200 ${
              (selectedImage || selectedCar.imageUrls[0]) === img
                ? 'ring-4 ring-indigo-500'
                : 'opacity-80 hover:opacity-100'
            }`}
          />
        ))}
      </div>
    )}

    <p className="mb-2">
      <strong>Price:</strong> {selectedCar.price || 'Price on Request'}
    </p>
    <p className="mb-2">
      <strong>Mileage:</strong> {selectedCar.mileage} km
    </p>
    <p className="mb-2">
      <strong>Year:</strong> {selectedCar.year}
    </p>
    <p className="mb-6">
      <strong>Description:</strong> {selectedCar.description || 'No description provided'}
    </p>

    <InquiryForm carId={selectedCar.id} carName={selectedCar.model}/>
  </div>
)}
    </div>
  );
};

export default CarsShowcase;
