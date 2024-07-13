import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Toast from './Card/Toast';
import { useAuth } from './Auth/AuthGuardFunction';

function Profile() {
  const {user , updateUser} = useAuth();
  const [userData, setUserData] = useState();
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toastModal , setToastModal] = useState(false)
  const [cancelMembership , setCancelMembership] = useState(false)
  const [toastData, setToastData] = useState({
    color: "",
    message: ""
  });
  useEffect(() => {
    axios.get(`http://localhost:3030/profile/${user.id}`).then(res => {
      setUserData(res.data);
    });
  }, []);

  
  const handleEdit = () => {
    setEditMode(true);
    setEditedUserData(userData);
  };

  const handleSave = async () => {
    setEditMode(false);
    await axios.put(`http://localhost:3030/profile/${user.id}`, editedUserData);
    setUserData(editedUserData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePasswordChange = () => {
    // Check if new password matches confirm password
    if (newPassword === confirmPassword) {
      // Update password in editedUserData
      setEditedUserData(prevData => ({
        ...prevData,
        password: newPassword
      }));
      // Clear password fields
      setNewPassword('');
      setConfirmPassword('');
      setToastModal(true)
      setToastData({
        message : "Password Changed Successfully",
        color : "green"
      })
      
      setTimeout(()=>{
        setToastModal(false)
      },3000)
    } else {
      // Show error message if passwords don't match
      setToastModal(true)
      setToastData({
        message : "Password doesnt match",
        color : "red"
      })

      setTimeout(()=>{
        setToastModal(false)
      },3000)
      
    }
  };
  const handleCancelMembership = async () => {
    const newData = {
      ...userData,
      Subscription: "Inactive",
      SubscriptionType: ""
    };
    await axios.put(`http://localhost:3030/profile/${user.id}`, newData);
    setUserData(newData);
    setToastModal(true);
    updateUser(newData)
    setToastData({
      message: "Membership canceled successfully",
      color: "green"
    });
    setTimeout(() => {
      setToastModal(false);
    }, 3000);
    setCancelMembership(false)
  
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {userData ? (
        <section className="px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center mb-8">
              <img src={require("../assets/images/user.png")} alt="Profile" className="w-32 h-32 rounded-full mr-4" />
              <div>
                <h2 className="text-3xl font-bold">{userData.firstName} {userData.lastName}</h2>
                <p className="text-gray-400">User ID: {userData.userId}</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-700">
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="py-2 px-4 font-semibold">Subscription Type</td>
                    <td className="py-2 px-4">{userData.SubscriptionType}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-semibold">Plan</td>
                    <td className="py-2 px-4">{userData.plan}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-semibold">Subscription Status</td>
                    <td className="py-2 px-4">{userData.Subscription}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-semibold">Password</td>
                    <td className="py-2 px-4">{"********"}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-semibold">Payment Type</td>
                    <td className="py-2 px-4">{editMode ? <select name="paymentType" value={editedUserData.paymentType} onChange={handleInputChange} className="text-black bg-white rounded-md border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                      <option value="credit card">Credit Card</option>
                      <option value="debit card">Debit Card</option>
                      <option value="upi">UPI</option>
                      <option value="pay later">Pay Later</option>
                    </select> : userData.paymentType}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-semibold">Payment Details</td>
                    <td className="py-2 px-4">{editMode ? <input type="text" name="encryptedPaymentDetails" value={editedUserData.encryptedPaymentDetails} onChange={handleInputChange} className="text-black p-2 bg-white rounded-md border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder='Card Number'/> : userData.encryptedPaymentDetails}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-semibold">Language</td>
                    <td className="py-2 px-4">{userData.preferences.language}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-semibold">Subtitle Language</td>
                    <td className="py-2 px-4">{userData.preferences.subtitleLanguage}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-semibold">Parental Control</td>
                    <td className="py-2 px-4">{userData.preferences.parentalControl}</td>
                  </tr>
                  {editMode && (
                    <>
                      <tr>
                        <td className="py-2 px-4 font-semibold">New Password</td>
                        <td className="py-2 px-4">
                          <input
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            placeholder='Enter New Password'
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="text-black p-2 bg-white rounded-md border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-semibold">Confirm Password</td>
                        <td className="py-2 px-4">
                          <input
                            type="password"
                            placeholder='Confirm New Password'
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="text-black p-2 bg-white rounded-md border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          />
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-8">
              {editMode ? (
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleSave}>Save</button>
              ) : (
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleEdit}>Edit</button>
              )}
              {/* Change password button */}
              {editMode && (
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={handlePasswordChange}>Change Password</button>
              )}
            </div>
            { userData.SubscriptionType !== "" && <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={()=>setCancelMembership(true)}>Cancel Membership</button>}
          </div>
          {
  cancelMembership && (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-white text-black p-8 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-4">Cancel Membership</h1>
        <p className="mb-8">Are you sure you want to cancel your membership?</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setCancelMembership(false)}
            className="bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-800 py-2 px-4 rounded-md focus:outline-none"
          >
            Close
          </button>
          <button
            onClick={handleCancelMembership}
            className="bg-red-500 text-white hover:bg-red-600 py-2 px-4 rounded-md focus:outline-none"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}


        </section>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl font-bold">Login to see details!</h1>
        </div>
      )}
      {
        toastModal && <Toast data={toastData}></Toast>
      }
    </div>
  );
}

export default Profile;
