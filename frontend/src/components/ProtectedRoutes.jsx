import { Navigate, Outlet } from 'react-router-dom'
const ProtectedRoutes = () => {
  let auth = {'token': localStorage.getItem('access_token')}
return (
    auth.token ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default ProtectedRoutes