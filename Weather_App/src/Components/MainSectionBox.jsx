/* eslint-disable no-unused-vars */
import React from 'react'
import CityList from "./CityList"
import CityDataTable from "./CityDataTable"
import CityArrayContextProvider from '../Context/CityArrayContextProvider'
function MainSectionBox() {
  return (
   <CityArrayContextProvider>
    <main className="max-md:flex-col max-md:items-center max-md:pt-10 flex  w-[screen] h-fit min-h-[88vh] ">
    <CityList/>
    <CityDataTable/>
    </main>
   </CityArrayContextProvider>
  )
}

export default MainSectionBox