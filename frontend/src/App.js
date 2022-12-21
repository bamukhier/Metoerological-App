import { useState, useEffect } from "react";
import './App.css';
import CoordsList from './components/CoordsList'
import axios from 'axios'
import { Heading, VStack, useColorMode, Button } from '@chakra-ui/react'
import {FaSun, FaMoon} from 'react-icons/fa'

function App() {
 
const {colorMode, toggleColorMode} = useColorMode()
const [coords, setCoords] = useState([])


const fetchCoords = async () => {
  try {
    const { data } = await axios.get('/api/coordinate')
    setCoords(data)
  } catch (err) {
    console.log(err)
  }
}

const addCoords = async newCoords => {
  try {
    const { data } = await axios.post('api/coordinate/', newCoords)
    setCoords([...coords, data])
  } catch (err) {
    console.log(err)
  }
}

const updateCoords = async (id, newCoords) => {
  try {
    const { data } = await axios.put(`api/coordinate/${id}/`, newCoords)
    const updatedList = coords.map( coord => coord.id !== id ? coord : data)
    setCoords(updatedList)
  } catch (err) {
    console.log(err)
  }
}

const deleteCoords = async id => {
  try {
    await axios.delete(`api/coordinate/${id}/`)
    const newCoords = coords.filter(coord => coord.id !== id)
    setCoords(newCoords)
  } catch (err) {
    console.log(err)
  }
}

useEffect( () => {
  fetchCoords()
}, [])

  return (
    <>
    <VStack p={5}>
      <Button leftIcon={colorMode === 'light' ? <FaMoon /> : <FaSun />} borderRadius='8px' alignSelf='flex-end' onClick={toggleColorMode}>{colorMode === 'light' ? 'Night Mode' : 'Day Mode'}</Button>
      <Heading mb='4' fontWeight='extrabold' size='xl' 
                        bgGradient='linear(to right, #8360c3, #2ebf91)' bgClip='text'>Meteorological App</Heading>
    <CoordsList coords={coords} addCoords={addCoords} updateCoords={updateCoords} deleteCoords={deleteCoords}/>
    </VStack>
    </>

  );
}

export default App;
