import React, { createContext, useEffect, useMemo, useState } from 'react';
import axiosInstance from '../helpers/configEndpoints';

const GoalsContext = createContext();

const GoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  // Function to fetch goals data
  const fetchGoals = async () => {
    try {
      const response = await axiosInstance.get('/goals');
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  useEffect(() => {
    // Fetch goals initially
    fetchGoals();

    // Set up interval for polling
    const interval = setInterval(() => {
      fetchGoals();
    }, 5000); // Poll every 5 seconds (adjust as needed)

    // Clean up interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Memoize goals context value to optimize performance
  const memoizedValue = useMemo(() => goals, [goals]);

  return (
    <GoalsContext.Provider value={memoizedValue}>
      {children}
    </GoalsContext.Provider>
  );
};

export { GoalsContext, GoalsProvider };
