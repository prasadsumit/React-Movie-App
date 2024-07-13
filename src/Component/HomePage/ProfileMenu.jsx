import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../App.css"
import { useAuth } from '../Auth/AuthGuardFunction';

function ProfileMenu({LoginModalState}) {

  const { user } = useAuth();
  

 

  return (
    <div className="absolute right-16 top-16 shadow-xl p-10 rounded-2xl text-white flex flex-col bg-gray-600  Profile_Menu">
      {user &&<>
       <h1>Hello {user.firstName}!</h1>
      <hr className="my-2 border-gray-700" ></hr>
      </>
      }
      <Link to="/Profile" className="hover:text-gray-300">
        Profile
      </Link>
      <hr className="my-2 border-gray-700" />
      <div className="flex flex-col space-y-2">
        
        { user && <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>}
        
        
      </div>
    </div>
  );
}

export default ProfileMenu;
