/* eslint-disable no-unused-vars */
import React, { useContext, useEffect,  useState } from 'react'
import { CityArrayContext } from '../Context/CityArrayContextProvider';

function CityList() {
    const {cityArrayData,setCityArrayData,iRef,cityNameArray}=useContext(CityArrayContext);
      const [showLoader, setShowLoader] = useState(false);
      const [hIndex,setHIndex]=useState(-1);
     const getWeatherDataFunction=async(e)=>{
        e.preventDefault();
        try {
            setShowLoader(true)
            while(iRef.current<cityNameArray.length){
            let cityName = cityNameArray[iRef.current];
                let cityExists = cityArrayData.some((item) => item.name === cityName);
                if (cityExists) {
                    console.log(`City ${cityName} already exists, skipping...`);
                    iRef.current++;
                    continue; 
                }
            let response=await fetch(`https://python3-dot-parul-arena-2.appspot.com/test?cityname=${cityNameArray[iRef.current]}`);
            let data=await response.json();
            let cityObject={
                name:cityNameArray[iRef.current],
                description:data.description,
                pressure:data.pressure_in_hPa,
                temperature:data.temp_in_celsius,
                ageInHours:data.date_and_time
            }
            
            // console.log(iRef.current);
            setCityArrayData((prevData)=>[...prevData,cityObject])
            setHIndex(iRef.current)
            iRef.current++;
            setTimeout(() => {
                setShowLoader(false);
              }, 1000);
            //   console.log(cityArrayData)
            break;
            }
        } catch (error) {
            setTimeout(() => {
                setShowLoader(false);
              }, 1000);
            console.log("Error while getting weather from city list button" ,error);
        }
    }
    useEffect(()=>{
        ()=>{getWeatherDataFunction()};
    },[cityArrayData])
    
  return (
    <aside className='flex-col flex items-center h-full text-[20px] lg:text-[25px] 
    p-1 lg:p-5 max-md:border-none border-2 border-black  w-[98%] md:w-[20%] gap-3 md:gap-8 font-semibold'>
        <div className='text-center w-fit md:w-[90%] '>
            <button 
            className='bg-[#4472C4] text-white py-2 px-5 w-full rounded-[5px] cursor-pointer
            transition ease-in duration-150 hover:bg-[#1e232b]'
            onClick={getWeatherDataFunction}
            >
                Get Weather
            </button>
        </div>
        <div className=' w-[98%] md:w-[90%]'>
        <span className='bg-[#4472C4] py-2 text-white max-md:px-4  block w-fit md:w-full text-center 
        max-md:mb-5 mx-auto max-md:rounded-[5px]'>City Names</span>
        <ul className='max-md:flex max-md:flex-wrap justify-center items-center gap-5 max-md:p-2 
        md:border-none 
        border-2 border-black 
        text-center w-full'>
           
            {cityNameArray.map((item,idx)=>{
                return <li key={idx} className={`py-2 px-3
                    ${(idx<=hIndex) ? " border-4 border-green-500"  : "border-2 border-black" }`}
                >{item}</li>
            })}
        </ul>
        </div>
    </aside>
  )
}

export default CityList