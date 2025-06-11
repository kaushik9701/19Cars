import React, { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const InquiryForm = ({ carId, carName }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'inquiries'), {
        carId,
        carName,
        name,
        phone,
        message,
        timestamp: serverTimestamp(),
      });
      setSent(true);
      setName('');
      setPhone('');
      setMessage('');
    } catch (err) {
      console.error('Inquiry failed:', err);
    }
  };

  if (sent) return <div className="text-green-600 font-medium">Inquiry sent successfully!</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <h3 className="text-xl font-semibold">Send an Inquiry</h3>

      <input
        type="text"
        required
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="tel"
        required
        placeholder="Your phone number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <textarea
        required
        placeholder="Your message"
        value={message}
        onChange={e => setMessage(e.target.value)}
        className="w-full border p-2 rounded h-24"
      />

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Submit Inquiry
      </button>
    </form>
  );
};

export default InquiryForm;
