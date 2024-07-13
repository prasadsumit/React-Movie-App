import React, { useEffect, useState } from 'react';

import axios from 'axios';
import PriceCard from '../Card/PriceCard';

function Subscription() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
        const response = await axios.get(`http://localhost:3030/profile/${storedUser.id}`);
        setSubscription(response.data.SubscriptionType);
      } catch (error) {
        console.error("Error fetching subscription:", error);
      }
    };

    fetchSubscription();
  }, []);

  const subscriptionCard = [
    {planType: "Basic", planName: "Basic", screenNumber: "Stream on one device at a time.", price: "199", videoType: "SD", screenType: "Watch on your phone, and tablet"},
    {planType: "Mobile", planName: "Mobile", screenNumber: "Stream on two devices at a time.", price: "399", videoType: "SD/HD", screenType: "Watch on your laptop, phone, and tablet"},
    {planType: "Family", planName: "Family", screenNumber: "Stream on four devices at a time.", price: "599", videoType: "SD/HD/UHD/4K", screenType: "Watch on your laptop phone, and tablet"}
  ];

  return (
    <section className="bg-gray-900 py-12 h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-xl text-gray-200">
            Enjoy unlimited streaming with our Netflix plans.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {subscriptionCard.map((card, index) => (
            <PriceCard data={card} key={index} selectedSubscription={subscription} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Subscription;
