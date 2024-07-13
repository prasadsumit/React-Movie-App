import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import { useAuth } from '../Auth/AuthGuardFunction';
import Login from './Login';


function Navbar({ LoginModalState }) {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const { user } = useAuth();


  const handleProfileModal = () => {
    setProfileModalOpen(!profileModalOpen);
  };

  
  return (
    <div className="flex justify-between items-center px-10 bg-gray-800 text-white font-sans sticky top-0 h-16">
      <div>
        <Link to={"/"}><div className='text-red-700 font-bold text-2xl'>NETFLIX <div className='text-white text-xs text-center'>{user && user.SubscriptionType.toUpperCase()}</div></div></Link>
      </div>
      <div className="flex gap-10">
        <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
        {user && <Link to="/watchlist" className="text-gray-300 hover:text-white">Watchlist</Link>}
        <Link to="/Subscription">Subscription</Link>
      </div>
      {/* Hide the login button if the user is logged in */}
      <div className='flex gap-10 items-center'>
      {!user ? (
        <button
          onClick={() => { LoginModalState.handleLoginToggle(); console.log(LoginModalState.LoginModal) }}
          className="bg-red-600 hover:bg-red-700 text-white font-bold p-2 h-fit rounded"
        >
          Login
        </button>
      ) :  <div>
      <button onClick={handleProfileModal} className="text-gray-300 hover:text-white">
        <img src={require("../../assets/images/UserProfile.png")} alt='/'></img>
      </button>
    </div>}


     

      {/* Render the Login component if the user is not logged in and the Login modal is open */}
      {(!user && LoginModalState.LoginModal) && <Login LoginModalState={LoginModalState}></Login>}

      {profileModalOpen && <ProfileMenu handleProfileModal={handleProfileModal} LoginModalState={LoginModalState} />}
    </div>
</div>
  );
}

export default Navbar;
