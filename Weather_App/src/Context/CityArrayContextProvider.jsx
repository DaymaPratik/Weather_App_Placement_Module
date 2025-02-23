/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useRef, useState} from 'react'
export const CityArrayContext=createContext({});
function CityArrayContextProvider({children}) {
     const [cityArrayData,setCityArrayData]=useState([]);
     const cityNameArray=['London','New York','Los Angeles','Las Vegas'];
     const iRef = useRef(0);
  return (
    <CityArrayContext.Provider value={{cityArrayData,setCityArrayData,cityNameArray,iRef}}>
    {children}
    </CityArrayContext.Provider>
  )
}

export default CityArrayContextProvider