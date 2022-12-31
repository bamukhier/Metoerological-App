import { useContext } from 'react';
import { Route, Routes, useMatch, useNavigate } from "react-router-dom";
import { Heading, VStack, useColorMode, Button, useToast, Box, IconButton, Menu, MenuButton, MenuList, MenuDivider, MenuItem, Text } from '@chakra-ui/react'
import {FaSun, FaMoon, FaSignOutAlt, FaUser, FaCog} from 'react-icons/fa'
import Home from './pages/Home'
import CoordinatesDetails from './pages/CoordinatesDetails'
import AuthForm from './pages/AuthForm';
import axiosInstance from './utils/axios'
import ProtectedRoutes from './components/ProtectedRoutes'
import AuthContext from './components/AuthContext'

function App() {
 
  const {colorMode, toggleColorMode} = useColorMode()
  const toast = useToast()
  const isHomePage = useMatch('/')
  const navigateTo = useNavigate()
  const { setAccessToken, setRefreshToken, setTokenClaims, tokenClaims } = useContext(AuthContext)


  const handleLogout = async () => {

    try {
      await axiosInstance.post('/user/logout', {refresh_token: localStorage.getItem('refresh_token')})
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      setAccessToken(null)
      setRefreshToken(null)
      setTokenClaims(null)
      axiosInstance.defaults.headers['Authorization'] = null
      navigateTo('/login')

    } catch (e) {
        toast({
            title: 'Could not log you out at the moment',
            description: e.message,
            status: 'error',
            duration: 5000,
        })
    }
  }

  return (
      <VStack p={1} mb={8}>
        <Box alignSelf='flex-end'>
          <Menu>
              <MenuButton as={IconButton} icon={<FaCog />} p={1} aria-label='Settings' fontSize='xl' m='1' />
              <MenuList>
                { tokenClaims && 
                  <>
                    <MenuItem>
                      <Text fontSize='xs'>Welcome <Text fontSize='md' fontWeight='semibold'>{tokenClaims?.email}</Text></Text>
                    </MenuItem>
                    <MenuDivider />
                  </>                
                }
                <MenuItem onClick={toggleColorMode} icon={colorMode === 'light' ? <FaMoon /> : <FaSun />} >
                  <Text fontWeight='semibold'>{colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}</Text>
                </MenuItem>
                { tokenClaims && <MenuItem onClick={handleLogout} icon={<FaSignOutAlt />} color='red.500' fontWeight='semibold'>Logout</MenuItem> }
              </MenuList>
          </Menu>

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
