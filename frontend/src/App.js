import './App.css';
import { Route, Routes } from "react-router-dom";
import { Heading, VStack, useColorMode, Button } from '@chakra-ui/react'
import {FaSun, FaMoon} from 'react-icons/fa'
import Home from './pages/Home'
import CoordinatesDetails from './pages/CoordinatesDetails'

function App() {
 
const {colorMode, toggleColorMode} = useColorMode()

  return (
      <VStack p={2} mb={8}>
      <Button leftIcon={colorMode === 'light' ? <FaMoon /> : <FaSun />} borderRadius='8px' alignSelf='flex-end' onClick={toggleColorMode}>{colorMode === 'light' ? 'Lights Off' : 'Lights On'}</Button>
      <Heading mb='8' fontWeight='extrabold' size='xl' 
                        bgGradient='linear(to right, #8360c3, #2ebf91)' bgClip='text'>Meteorological App</Heading>
        <Routes>
          <Route path='/coordinates/:coordsId' element={<CoordinatesDetails />} />
          <Route path='/cities/:coordsId' element={<CoordinatesDetails />} />
          <Route index path='/' element={<Home />} />
        </Routes>
    </VStack>
  );
}

export default App;
