import './App.css';
import { Route, Routes, useMatch, useNavigate } from "react-router-dom";
import { Heading, VStack, useColorMode, Button, useToast, Box } from '@chakra-ui/react'
import {FaSun, FaMoon, FaSignOutAlt} from 'react-icons/fa'
import Home from './pages/Home'
import CoordinatesDetails from './pages/CoordinatesDetails'
import AuthForm from './pages/AuthForm';
import axiosInstance from './utils/axios'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {
 
  const {colorMode, toggleColorMode} = useColorMode()
  const toast = useToast()
  const isHomePage = useMatch('/')
  const navigateTo = useNavigate()

  const handleLogout = async () => {
    try {
      await axiosInstance.post('api/user/logout', {refresh_token: localStorage.getItem('refresh_token')})
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      axiosInstance.defaults.headers['Authorization'] = null
      navigateTo('/login')
    } catch (e) {
        toast({
            title: 'Could not log you out',
            description: e.message,
            status: 'error',
            duration: 5000,
        })
    }
  }

  return (
      <VStack p={2} mb={8}>
        <Box alignSelf='flex-end'>
          <Button mr={2} leftIcon={colorMode === 'light' ? <FaMoon /> : <FaSun />} borderRadius='8px' alignSelf='flex-end' onClick={toggleColorMode}>{colorMode === 'light' ? 'Lights Off' : 'Lights On'}</Button>
          {isHomePage && <Button leftIcon={<FaSignOutAlt />} borderRadius='8px' alignSelf='flex-end' onClick={handleLogout}>Logout</Button>}
        </Box>
        <Heading mb='8' fontWeight='extrabold' size='xl' 
                        bgGradient='linear(to right, #8360c3, #2ebf91)' bgClip='text'>Meteorological App</Heading>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path='/coordinates/:coordsId' element={<CoordinatesDetails />} />
            <Route path='/cities/:coordsId' element={<CoordinatesDetails />} />
            <Route index path='/' element={<Home />} />
          </Route>
          <Route path='/login' element={<AuthForm />} />
          <Route path='/signup' element={<AuthForm />} />
        </Routes>
    </VStack>
  );
}

export default App;
