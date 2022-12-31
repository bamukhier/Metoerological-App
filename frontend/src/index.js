import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { BrowserRouter as Router} from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ChakraProvider>
          <ColorModeScript initialColorMode='system'/>
          <App />
        </ChakraProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);