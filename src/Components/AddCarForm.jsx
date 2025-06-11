import React, { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AddCarForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    description: '',
    status: 'available',
    imageUrl: ''
  });

  const [imageFiles, setImageFiles] = useState([]);
const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleImageUpload = async () => {
    if (imageFiles.length === 0) {
      alert('Please select images first.');
      return;
    }
  
    setUploading(true);
    setMessage('');
    const uploadedUrls = [];
  
    try {
      for (const file of imageFiles) {
        const formDataCloudinary = new FormData();
        formDataCloudinary.append('file', file);
        formDataCloudinary.append('upload_preset', 'carConnect');
  
        const res = await fetch('https://api.cloudinary.com/v1_1/duzg5ijih/image/upload', {
          method: 'POST',
          body: formDataCloudinary,
        });
  
        if (!res.ok) throw new Error('Image upload failed');
        const data = await res.json();
        uploadedUrls.push(data.secure_url);
      }
  
      setImageUrls(uploadedUrls);
      setMessage('Images uploaded successfully!');
    } catch (err) {
      setMessage('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!formData.make || !formData.model || !formData.year || !formData.price || imageUrls.length === 0) {

      alert('Please fill all required fields and upload an image.');
      return;
    }

    setUploading(true);
    try {
      await addDoc(collection(db, 'cars'), {
        ...formData,
        imageUrls, // now an array
        year: Number(formData.year),
        price: Number(formData.price),
        mileage: Number(formData.mileage),
        createdAt: serverTimestamp(),
      });
      

      setMessage('Car added successfully!');
      setFormData({
        make: '',
        model: '',
        year: '',
        price: '',
        mileage: '',
        description: '',
        status: 'available',
        imageUrl: ''
      });
      setImageFiles([]);
setImageUrls([]);

      onSuccess?.();
    } catch (err) {
      setMessage('Failed to add car: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: 'make', label: 'Make *', placeholder: 'Toyota' },
          { name: 'model', label: 'Model *', placeholder: 'Camry' },
          { name: 'year', label: 'Year *', type: 'number', placeholder: '2020', min: 1990, max: new Date().getFullYear() + 1 },
          { name: 'price', label: 'Price ($) *', type: 'number', placeholder: '25000' },
          { name: 'mileage', label: 'Mileage', type: 'number', placeholder: '45000' },
        ].map(({ name, label, type = 'text', ...rest }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              name={name}
              type={type}
              value={formData[name]}
              onChange={handleChange}
              required={label.includes('*')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              {...rest}
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="Describe the car features, condition, etc."
        />
      </div>

      {/* Image Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image *</label>
        <input
  type="file"
  accept="image/*"
  multiple
  onChange={handleImageChange}
  className="mb-2 bg-blue-400 w-50 rounded-full px-5 mx-3"
/>
        <button
          type="button"
          onClick={handleImageUpload}
          disabled={uploading || imageFiles.length === 0}

          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
        {imageUrls.length > 0 && (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
    {imageUrls.map((url, index) => (
      <img
        key={index}
        src={url}
        alt={`Uploaded ${index + 1}`}
        className="w-full h-40 object-cover rounded"
      />
    ))}
  </div>
)}

      </div>

      {message && <p className="text-center text-sm text-red-600">{message}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={uploading}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {uploading ? 'Saving...' : 'Add Vehicle'}
        </button>
      </div>
    </form>
  );
};

export default AddCarForm;
