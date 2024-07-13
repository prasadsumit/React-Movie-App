import React from 'react';
import { Link } from 'react-router-dom';

function PriceCard({ data, selectedSubscription }) {
 
  return (
    <div>
      <div className="bg-red-800 rounded-lg shadow-lg p-6 relative overflow-hidden h-96 z-0">
        <div className="absolute top-0 right-0 m-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-600 text-red-100">
            {data.planType}
          </span>
        </div>
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-white">{data.planName} plan</h3>
          <p className="mt-4 text-gray-200">{data.screenNumber}</p>
        </div>
        <div className="mb-8">
          <span className="text-5xl font-extrabold text-white">&#8360; {data.price}</span>
          <span className="text-xl font-medium text-gray-200">/mo</span>
        </div>
        <ul className="mb-8 space-y-4 text-gray-200">
          <li className="flex items-center">
            <svg className="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{data.videoType}</span>
          </li>
          <li className="flex items-center">
            <svg className="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{data.screenType}</span>
          </li>
        </ul>
        {data.planType!== selectedSubscription ? (
          <Link to="/PaymentGate" state={{ amount: data.price , plan : data.planName }} className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
          Select Plan
        </Link>
        
        ) : (
          <button className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r bg-black cursor-not-allowed" disabled>
            Current Plan
          </button>
        )}
      </div>
    </div>
  );
}

export default PriceCard;
