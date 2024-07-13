import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from "./Animation - 1714290930527.json"
import { useAuth } from '../Auth/AuthGuardFunction';

function PaymentConfirmationPage({ confirmModalState, data }) {

  const {login} = useAuth();
  const {user , updateUser} = useAuth() 
console.log(user.id)
  const [paymentInitiated, setPaymentInitiated] = useState(false);
 
const Navigate = useNavigate()
  const initiateTransaction = () => {
    setPaymentInitiated(true);
    axios.put(`http://localhost:3030/profile/${user.id}`, {...user, SubscriptionType: data.plan  , Subscription : "Active"})
      .then(response => {
        login(user)
        let newUser = {...user, SubscriptionType: data.plan  , Subscription : "Active"}
        updateUser(newUser)
        localStorage.setItem("user", user)
        console.log("Profile updated successfully:", response.data);        
      })
      .catch(error => {
        console.error("Error updating profile:", error);
      })
      .finally(() => {
        const updatedUser = {...user,SubscriptionType : data.plan}
        localStorage.setItem("user", JSON.stringify(updatedUser))
        setTimeout(() => {
          Navigate(-1)
          // localStorage.clear()
          setPaymentInitiated(false)
        }, 1500); 
      });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      {!paymentInitiated ? (
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <div className="flex justify-between mb-4">
            <div className="text-lg font-bold">Payment Confirmation : {data.plan}</div>
          </div>
          <div className="mb-4">Amount: {data.amount}</div>
          <div className="flex justify-end">
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4" onClick={initiateTransaction}>
              Pay Now
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => confirmModalState.setConfirmModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div style={{ width: 400, height: 400 }}>
      <Lottie animationData={animationData} />
    </div>
      )}
    </div>
  );
}

export default PaymentConfirmationPage;
