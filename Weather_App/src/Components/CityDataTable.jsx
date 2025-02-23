/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { CityArrayContext } from "../Context/CityArrayContextProvider";
import FadeLoader from "react-spinners/FadeLoader";

function CityDataTable() {
  const { cityArrayData, setCityArrayData, cityNameArray, iRef } =
    useContext(CityArrayContext);
  const [cityNameSearchValue, setCityNameSearchValue] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [showErrorTable, setShowErroTable] = useState(false);
  const [highlight,setHighLight]=useState(false);
  const [hIndex,setHIndex]=useState(-1);
  //    DELETE FUNCTION OF CITY DATA
  const deleteCityData = (idx) => {
    const newCityArray = cityArrayData.filter((item, itemIdx) => {
      return itemIdx != idx;
    });
    setCityArrayData(newCityArray);
    --iRef.current;
    console.log(iRef.current);
  };

  function functionToConvertPascalCase(str) {
    return str
      .split(/(\s+|[_-]+)/) // Split on spaces, underscores, or hyphens, but keep spaces
      .map((word) =>
        word.trim()
          ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          : word
      )
      .join("");
  }
  function highlightTableRowFunction(cityName){
    cityArrayData.map((item)=>{
        if(item.name===cityName){
            // console.log(cityName);
            setHighLight(true);
            setTimeout(() => {
                setHighLight(false);
            }, 3000);
        }
    })
    
  }

  //    FUNCTION FOR GETTING DATA BY SEARCH BAR USING CITY NAME
  const getCityDataFromSerachBarFunction = async (e) => {
    e.preventDefault();
    let cityNameInPascalCase = functionToConvertPascalCase(cityNameSearchValue);
    setShowLoader(true);
    setShowErroTable(false);
    try {
        var existingCityIndex=-1;
      if (cityNameArray.includes(cityNameInPascalCase) &&
        iRef.current <= cityNameArray.length) {
        let cityExists = cityArrayData.some(
          (item,idx) => {
            existingCityIndex=idx;
            return item.name === cityNameInPascalCase}
        );
        if (cityExists) {
        highlightTableRowFunction(cityNameInPascalCase);
        setHIndex(existingCityIndex)
          console.log(
            `City ${cityNameInPascalCase} and ${existingCityIndex}  already exists, skipping...`
          );
          setTimeout(() => {
            setShowLoader(false);
          }, 1000);
          return;
        }
        const response = await fetch(
          `https://python3-dot-parul-arena-2.appspot.com/test?cityname=${cityNameInPascalCase}`
        );
        const data = await response.json();
        var cityObject = {
          name: cityNameInPascalCase,
          description: data.description,
          pressure: data.pressure_in_hPa,
          temperature: data.temp_in_celsius,
          ageInHours: data.date_and_time,
        };
        setCityArrayData((prevData) => [...prevData, cityObject]);
        console.log(cityArrayData);
        
        if (!(iRef.current === 0)) {
          iRef.current--;
        }
        setTimeout(() => {
          setShowLoader(false);
        }, 1000);
      } else {
        console.log("Enter Valid City Name");
        setTimeout(() => {
          setShowLoader(false);
        }, 1000);
        setShowErroTable(true);
      }
    } catch (error) {
      console.log(
        "Error While getting city data or please enter correct city name",
        error
      );
    }
  };

  useEffect(() => {
    setShowErroTable(false);
  }, [cityArrayData]);
  return (
    <main className="main-data-box w-[100%] max-md:mt-10 md:w-[80%] flex flex-col 
     items-center border-2 border-black">
      {/* SERACH BOX COMPONENT */}
      <div className="search-box p-2 xs:p-5 text-[17px] md:text-[20px] lg:text-[25px] 
      w-full text-right px-3 xs:px-10">
        <form action="">
          <input
            type="text"
            placeholder="Enter City Name...... "
            className="p-[5px] md:p-[15px] border-2 border-black rounded-l-[5px] 
              w-[80%]  xs:w-[70%] md:w-[50%]"
            value={cityNameSearchValue}
            onChange={(e) => {
              setCityNameSearchValue(e.target.value);
            }}
          />
          <button
            className="bg-[#4472C4] text-white p-[7px] md:p-[17px] rounded-r-[5px]"
            onClick={(e) => {
              getCityDataFromSerachBarFunction(e);
            }}
          >
            Search
          </button>
        </form>
      </div>

      {/* TABLE OF CITY WEATHER DATA COMPONENT */}
      <table className="w-[100%] lg:w-[95%] text-center">
        <thead className="bg-[#4472C4] text-[10px] sm:text-[17px] lg:text-[25px] p-3 ">
          <tr>
            <th className="py-[20px]">City</th>
            <th className="py-[20px]">Discription</th>
            <th className="py-[20px]">Temperature</th>
            <th className="py-[20px]">Pressure</th>
            <th className="py-[20px]">Data Age (hrs)</th>
            <th className="py-[20px]">Delete</th>
          </tr>
        </thead>
        {cityArrayData.length > 0
        ?
        showLoader ? (
            <tbody>
              <tr>
                <td
                  colSpan="6"
                  className="text-[40px] font-bold py-4 text-center w-full"
                >
                  <div className="flex justify-center items-center w-full">
                    Loading...
                    <span className="ml-3">
                      <FadeLoader color="#0290ff" height={10} width={10} />
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="p-3 text-[10px] sm:text-[17px] lg:text-[25px] ">
              {cityArrayData?.map((item, idx) => {
                return (
                  <tr key={idx} className={`py-[20px] border-2 border-black
                   ${(highlight && hIndex===idx)  ? "bg-yellow-500"  : "bg-white" } `}>
                    <td className="py-[20px]">{item.name}</td>
                    <td className="py-[20px]">{item.description}</td>
                    <td className="py-[20px]">{item.temperature}</td>
                    <td className="py-[20px]">{item.pressure}</td>
                    <td className="py-[20px]">{item.ageInHours}</td>
                    <td
                      className="py-[20px] cursor-pointer"
                      onClick={() => deleteCityData(idx)}
                    >
                      Delete
                    </td>
                  </tr>
                );
              })}
  
              <tr>
                <td
                  colSpan="6"
                  className="text-[25px] md:text-[35px] font-bold  w-full text-center"
                >
                  {showErrorTable && (
                    <span className="border-2 border-black py-2 w-full block ">
                      No Data Found, Please Enter valid City Name !
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          )
        
          :
          <tbody>
             <tr>
                <td
                  colSpan="6"
                  className="text-[35px] md:text-[35px] font-bold  w-full text-center"
                >
                    <span className="border-2 border-black py-2 w-full block ">
                      No Data !
                    </span>
                  
                </td>
              </tr>
          </tbody>
        }
      </table>
    </main>
  );
}

export default CityDataTable;
