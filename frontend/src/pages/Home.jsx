import { useState, useEffect } from "react";
import CoordsList from '../components/CoordsList'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

function Home() {
 
const toast = useToast()

const [coords, setCoords] = useState([])
const [weatherCoords, setWeatherCoords] = useState([])
const [currentOffset, setCurrentOffset] = useState(0)


const fetchCoords = async (limit, offset) => {
  try {
    const { data } = await axios.get(`/api/coords/?limit=${limit}&offset=${offset}`)
    console.log(data)
    setCoords(data.results)
    return data.count
  } catch (err) {
    console.log(err)
    toast({
        status: 'error',
        title: 'Encountered an error while fetching data',
        description: err.message,
        duration: '5000'
    })
  }
}

const queryURLBuilder = (coords) => {
  const mateomaticsToken = process.env.REACT_APP_MATEOMATICS_TOKEN
  const weatherParams = 't_min_2m_24h:C,t_max_2m_24h:C,weather_symbol_24h:idx'
  const dt = new Date().toISOString()
  return `https://api.meteomatics.com/${dt}/${weatherParams}/${coords.lat},${coords.long}/json?access_token=${mateomaticsToken}`
}

const combineAllForcastsWithCoords = responses => {
  const coordsWithForcasts = responses.map((res, i) => {
    const coordWithoutWeather = coords[i]
    const extractedData = {
      ...coordWithoutWeather,
      minTemp: res.data.data[0].coordinates[0].dates[0].value,
      maxTemp: res.data.data[1].coordinates[0].dates[0].value,
      weatherSymbolNum: res.data.data[2].coordinates[0].dates[0].value,
    }
    return extractedData
  })
  return coordsWithForcasts
}

const fetchAllForcasts = async () => {
  const reqURLs = coords.map(coords => queryURLBuilder(coords))
  await Promise.all(reqURLs.map(url => axios.get(url)))
  .then(function(res){
    setWeatherCoords(combineAllForcastsWithCoords(res))
  })
  .catch(function(err){
    console.log(err)
    toast({
        status: 'error',
        title: 'Encountered an error while fetching data.',
        description: err.message,
        duration: '5000'
    })
  })
}

// const combineSingleForcastWithCoords = (coords, res) => {
//   return {
//     ...coords,
//     minTemp: res.data.data[0].coordinates[0].dates[0].value,
//     maxTemp: res.data.data[1].coordinates[0].dates[0].value,
//     weatherSymbolNum: res.data.data[2].coordinates[0].dates[0].value,
//   }
// }
//
// const fetchSingleForcast = async (coords) => {
//   const reqURL = queryURLBuilder(coords)
//   try {
//     const res = await axios.get(reqURL)
//     return combineSingleForcastWithCoords(coords, res)
    
//   } catch (err) {
//     console.log(err)
//     toast({
//       status: 'error',
//       title: 'Encountered an error while fetching data. Please refresh the page',
//       description: err.message,
//       duration: '5000'
//     })
//   }
// }

const addCoords = async newCoords => {
  try {
    const { data } = await axios.post('api/coords/', newCoords)
    fetchCoords(5, currentOffset)
    // setCoords([...coords, data])
    // const coordWithForcast = await fetchSingleForcast(data)
    // setWeatherCoords([...weatherCoords, coordWithForcast])
  } catch (err) {
    console.log(err)
  }
}

const updateCoords = async (id, newCoords) => {
  try {
    const { data } = await axios.put(`api/coords/${id}/`, newCoords)
    fetchCoords(5, currentOffset)
    // const updatedList = coords.map( coord => coord.id !== id ? coord : data)
    // setCoords(updatedList)
    // const coordWithForcast = await fetchSingleForcast(data)
    // const updatedForcasts = weatherCoords.map( coord => coord.id !== id ? coord : coordWithForcast)
    // setWeatherCoords(updatedForcasts)


  } catch (err) {
    console.log(err)
  }
}

const deleteCoords = async id => {
  try {
    await axios.delete(`api/coords/${id}/`)
      fetchCoords(5, currentOffset)
    // const newCoords = coords.filter(coord => coord.id !== id)
    // setCoords(newCoords)
    // const newWeatherCoords = weatherCoords.filter(coord => coord.id !== id)
    // setWeatherCoords(newWeatherCoords)
  } catch (err) {
    console.log(err)
  }
}


useEffect( () => {
  if (coords){
    fetchAllForcasts()
  }
}, [coords])


  return (
    <>
        <CoordsList coords={weatherCoords} fetchCoords={fetchCoords} handleOffsetChange={setCurrentOffset} addCoords={addCoords} updateCoords={updateCoords} deleteCoords={deleteCoords}/>
    </>

  );
}

export default Home;
