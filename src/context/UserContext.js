'use client';
import { createContext, useContext, useState } from 'react';

// Create the UserContext
const UserContext = createContext();

// Create the Provider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null); // Initial value of userData
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  return (
    <UserContext.Provider value={{ userData, setUserData,mobile,setMobile,email,setEmail }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUser = () => useContext(UserContext);
