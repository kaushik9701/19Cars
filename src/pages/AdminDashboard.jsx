import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { auth, db } from '../firebase/firebaseConfig';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import AddCarForm from '../Components/AddCarForm';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cars');
  const [cars, setCars] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
 
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'inquiries', id));
      setInquiries(prev => prev.filter(inq => inq.id !== id));
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Fetch cars from Firestore
  const fetchCars = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'cars'));
      const carsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCars(carsList);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch inquiries from Firestore
  const fetchInquiries = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'inquiries'));
      const inquiriesList = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate().toLocaleString() || 'N/A'
      }));
      setInquiries(inquiriesList);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  // Delete a car
  const handleDeleteCar = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await deleteDoc(doc(db, 'cars', carId));
        setCars(cars.filter(car => car.id !== carId));
        setSuccessMessage('Car deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting car:', error);
      }
    }
  };

  // Update car status
  const handleUpdateStatus = async (carId, newStatus) => {
    try {
      await updateDoc(doc(db, 'cars', carId), { status: newStatus });
      setCars(cars.map(car => car.id === carId ? {...car, status: newStatus} : car));
      setSuccessMessage('Status updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    fetchCars();
    fetchInquiries();
  }, []);

  // Tabs component
  const Tabs = () => (
    <div className="flex border-b border-gray-200 mb-6">
      {[
        { id: 'cars', label: 'Manage Cars' },
        { id: 'add', label: 'Add New Car' },
        { id: 'inquiries', label: 'Customer Inquiries' },
      ].map((tab) => (
        <button
          key={tab.id}
          className={`py-3 px-6 font-medium text-sm rounded-t-lg transition-colors ${
            activeTab === tab.id
              ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusColors = {
      available: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      sold: 'bg-red-100 text-red-800',
    };
    
    return (
      <span 
        className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}
      >
        {status}
      </span>
    );
  };

  // Content based on active tab
  const renderContent = () => {
    if (loading && activeTab === 'cars') {
      return (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      );
    }

    switch (activeTab) {
      case 'cars':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cars.length > 0 ? (
                  cars.map((car) => (
                    <tr key={car.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16 bg-gray-200 border rounded-md overflow-hidden">
                          {car.imageUrls?.[0] ? (
  <img className="h-full w-full object-cover" src={car.imageUrls[0]} alt={car.make} />
) : (
  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
)}

                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{car.year} {car.make} {car.model}</div>
                            <div className="text-sm text-gray-500">Mileage: {car.mileage || 'N/A'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${car.price ? car.price.toLocaleString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={car.status || 'available'}
                          onChange={(e) => handleUpdateStatus(car.id, e.target.value)}
                          className="block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option value="available">Available</option>
                          <option value="pending">Pending</option>
                          <option value="sold">Sold</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDeleteCar(car.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                      No cars found. Add your first car to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );

      case 'add':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium text-indigo-800">Add New Vehicle</h3>
              <p className="text-indigo-700 mt-1">Fill in all required details to list a new car</p>
            </div>
            <AddCarForm onSuccess={() => {
              fetchCars();
              setActiveTab('cars');
              setSuccessMessage('Car added successfully!');
              setTimeout(() => setSuccessMessage(''), 3000);
            }} />
          </motion.div>
        );

      case 'inquiries':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inquiries.length > 0 ? (
                  inquiries.map((inquiry) => (
                    <tr key={inquiry.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{inquiry.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{inquiry.email}</div>
                        <div className="text-sm text-gray-500">{inquiry.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {inquiry.carId ? (
                          cars.find(c => c.id === inquiry.carId)?.make || 'Car not found'
                        ) : (
                          'General Inquiry'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {inquiry.timestamp}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                        <div className="line-clamp-2">{inquiry.message}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
  <button
    onClick={() => handleDelete(inquiry.id)}
    className="text-red-600 hover:underline text-sm"
  >
    Delete
  </button>
</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      No inquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 bg-white rounded-xl shadow-lg p-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-700 mt-1">
              Welcome, <span className="font-medium text-indigo-600">{currentUser?.email}</span>
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
            <div className="ml-3">
              <p className="font-medium">Admin User</p>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-800 transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500">
            <h3 className="text-lg font-medium text-gray-900">Total Cars</h3>
            <p className="text-3xl font-bold mt-2">{cars.length}</p>
            <div className="mt-4 flex items-center">
              <StatusBadge status="available" />
              <span className="ml-2 text-sm text-gray-600">
                {cars.filter(c => c.status === 'available').length} available
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <h3 className="text-lg font-medium text-gray-900">Pending Sales</h3>
            <p className="text-3xl font-bold mt-2">
              {cars.filter(c => c.status === 'pending').length}
            </p>
            <div className="mt-4 flex items-center">
              <StatusBadge status="pending" />
              <span className="ml-2 text-sm text-gray-600">Needs follow up</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <h3 className="text-lg font-medium text-gray-900">Customer Inquiries</h3>
            <p className="text-3xl font-bold mt-2">{inquiries.length}</p>
            <div className="mt-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                {inquiries.filter(i => i.carId).length} car-specific
              </span>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{successMessage}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Tabs */}
          <Tabs />
          
          {/* Content */}
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

// AddCarForm component (simplified for integration)
// const AddCarForm = ({ onSuccess }) => {
//   const [formData, setFormData] = useState({
//     make: '',
//     model: '',
//     year: '',
//     price: '',
//     mileage: '',
//     description: '',
//     status: 'available'
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // In a real app, this would save to Firebase
//     console.log('Adding car:', formData);
//     // Simulate success
//     onSuccess();
//     setFormData({
//       make: '',
//       model: '',
//       year: '',
//       price: '',
//       mileage: '',
//       description: '',
//       status: 'available'
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Make *</label>
//           <input
//             type="text"
//             name="make"
//             value={formData.make}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Toyota"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Model *</label>
//           <input
//             type="text"
//             name="model"
//             value={formData.model}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Camry"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
//           <input
//             type="number"
//             name="year"
//             value={formData.year}
//             onChange={handleChange}
//             required
//             min="1990"
//             max={new Date().getFullYear() + 1}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="2020"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="25000"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Mileage</label>
//           <input
//             type="number"
//             name="mileage"
//             value={formData.mileage}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="45000"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           >
//             <option value="available">Available</option>
//             <option value="pending">Pending</option>
//             <option value="sold">Sold</option>
//           </select>
//         </div>
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           rows="4"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           placeholder="Describe the car features, condition, etc."
//         ></textarea>
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images</label>
//         <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//           <div className="space-y-1 text-center">
//             <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
//               <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//             <div className="flex text-sm text-gray-600">
//               <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
//                 <span>Upload files</span>
//                 <input type="file" className="sr-only" multiple />
//               </label>
//               <p className="pl-1">or drag and drop</p>
//             </div>
//             <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//           </div>
//         </div>
//       </div>
      
//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           Add Vehicle
//         </button>
//       </div>
//     </form>
//   );
// };

export default AdminDashboard;
