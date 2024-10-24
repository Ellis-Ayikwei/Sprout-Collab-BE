import React, { createContext, useState } from 'react';

const CollabsContext = createContext();

const CollabsProvider = ({ children }) => {
  const [collabid, setCollabid] = useState(null);

  return (
    <CollabsContext.Provider value={{collabid, setCollabid}}>
      {children}
    </CollabsContext.Provider>
  );
};

export { CollabsContext, CollabsProvider };
