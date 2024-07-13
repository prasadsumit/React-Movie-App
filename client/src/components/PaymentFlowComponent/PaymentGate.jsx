import React, { useState } from 'react';
import PaymentConfirmationPage from './PaymentConfirmationPage';
import { useLocation } from 'react-router-dom';

function PaymentGate(props) {
  const [confirmModal, setConfirmModal] = useState(false);
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const { plan } = location.state || {};
  const { amount } = location.state || {};
  const [cardNumber, setCardNumber] = useState('');
  const [cvvChange, setCVVChange] = useState('');

  const handleCardNumberChange = (e) => {
    const inputValue = e.target.value;
  
    // Restrict input to 16 characters
    const truncatedValue = inputValue.slice(0, 16);
    setCardNumber(truncatedValue);
  };

  const handleCVVChange = (e) => {
    const inputValue = e.target.value;
  
    // Restrict input to 3 characters
    const truncatedValue = inputValue.slice(0, 3);
    setCVVChange(truncatedValue);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const cardNumber = e.target.cardNumber.value;
    const cardExpiry = e.target.cardExpiry.value;
    const cvv = e.target.cvv.value;
    const cardHolderName = e.target.cardHolderName.value;

    const newErrors = {};

    // Card Number Validation
    if (!cardNumber.match(/^\d{16}$/)) {
      newErrors.cardNumber = "Card number must be a 16-digit number";
    }

    // Card Expiry Validation
    if (!cardExpiry.match(/^(0[1-9]|1[0-2])\/\d{4}$/)) {
      newErrors.cardExpiry = "Invalid card expiry format (MM/YYYY)";
    }

    // CVV Validation
    if (!cvv.match(/^\d{3}$/)) {
      newErrors.cvv = "CVV must be a 3-digit number";
    }

    // Card Holder Name Validation
    if (cardHolderName.trim() === "") {
      newErrors.cardHolderName = "Cardholder name is required";
    }

    if (Object.keys(newErrors).length === 0) {
      // No errors, proceed with form submission
      setConfirmModal(true);
    } else {
      // Errors found, update state to display errors
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Payment Gateway</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              onChange={handleCardNumberChange}
              value={cardNumber}
              type="text"
              id="cardNumber"
              className={`mt-1 p-2 w-full rounded-md border ${
                errors.cardNumber ? "border-red-500" : "border-gray-300"
              } focus:border-red-500 focus:outline-none focus:ring focus:ring-red-500`}
              placeholder="Enter 16 digit card number"
              required
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">
              Card Expiry (MM/YYYY)
            </label>
            <input
              type="text"
              id="cardExpiry"
              className={`mt-1 p-2 w-full rounded-md border ${
                errors.cardExpiry ? "border-red-500" : "border-gray-300"
              } focus:border-red-500 focus:outline-none focus:ring focus:ring-red-500`}
              placeholder="MM/YYYY"
              required
            />
            {errors.cardExpiry && (
              <p className="text-red-500 text-sm mt-1">{errors.cardExpiry}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              onChange={handleCVVChange}
              value={cvvChange}
              className={`mt-1 p-2 w-full rounded-md border ${
                errors.cvv ? "border-red-500" : "border-gray-300"
              } focus:border-red-500 focus:outline-none focus:ring focus:ring-red-500`}
              placeholder="CVV"
              required
            />
            {errors.cvv && (
              <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700">
              Cardholder Name
            </label>
            <input
              type="text"
              id="cardHolderName"
              className={`mt-1 p-2 w-full rounded-md border ${
                errors.cardHolderName ? "border-red-500" : "border-gray-300"
              } focus:border-red-500 focus:outline-none focus:ring focus:ring-red-500`}
              placeholder="Enter cardholder name"
              required
            />
            {errors.cardHolderName && (
              <p className="text-red-500 text-sm mt-1">{errors.cardHolderName}</p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-500"
            >
              Pay Now
            </button>
          </div>
        </form>
        {confirmModal && <PaymentConfirmationPage confirmModalState={{ confirmModal, setConfirmModal }} data={{ amount, plan }} />}
      </div>
    </div>
  );
}

export default PaymentGate;
