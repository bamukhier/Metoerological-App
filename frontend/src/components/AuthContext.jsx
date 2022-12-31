
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("access_token")
      ? localStorage.getItem("access_token")
    : null
  );
  const [refreshToken, setRefreshToken] = useState(() =>
    localStorage.getItem("refresh_token")
      ? localStorage.getItem("refresh_token")
    : null
  );
  const [tokenClaims, setTokenClaims] = useState(() =>
    localStorage.getItem("refresh_token")
      ? JSON.parse(atob(localStorage.getItem('refresh_token').split('.')[1]))
      : null
  );
  const [loading, setLoading] = useState(true);

//   const navigateTo = useNavigate();

//   const loginUser = async (username, password) => {
//     const response = await fetch("http://127.0.0.1:8000/api/token/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         username,
//         password
//       })
//     });
//     const data = await response.json();

//     if (response.status === 200) {
//       setAuthTokens(data);
//       setUser(jwt_decode(data.access));
//       localStorage.setItem("authTokens", JSON.stringify(data));
//       history.push("/");
//     } else {
//       alert("Something went wrong!");
//     }
//   };
  
//   const registerUser = async (username, password, password2) => {
//     const response = await fetch("http://127.0.0.1:8000/api/register/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         username,
//         password,
//         password2
//       })
//     });
//     if (response.status === 201) {
//       history.push("/login");
//     } else {
//       alert("Something went wrong!");
//     }
//   };

//   const logoutUser = () => {
//     setAuthTokens(null);
//     setUser(null);
//     localStorage.removeItem("authTokens");
//     history.push("/");
//   };


useEffect(() => {
    if (refreshToken) {
        const claims = JSON.parse(atob(refreshToken.split('.')[1]))
        setTokenClaims(claims);
    }
    setLoading(false);
}, [refreshToken]);

const contextData = {
  accessToken, 
  setAccessToken,
  refreshToken,
  setRefreshToken,
  tokenClaims,
  setTokenClaims
};

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};