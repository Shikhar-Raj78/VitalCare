import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/auth/authSlice';

const ClaimModal = ({ isOpen, onClose, planId }) => {
  const user = useSelector(selectUser);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('user', user._id);
    formData.append('plan', planId);
    formData.append('description', description);
    formData.append('prescription', image);

    try {
      const res = await axios.post('http://localhost:5000/api/users/createNewClaim', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      onClose();
    } catch (error) {
      console.error('Error submitting claim:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Claim Plan</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image:</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Submit Claim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClaimModal;
