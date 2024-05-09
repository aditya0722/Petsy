import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Routers } from 'react-router-dom'
import Home from './Components/Home'
import NavigationBar from './Components/navigation'
import footer from './Components/footer'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Routers>

    <App/>
    
    </Routers>
  </React.StrictMode>,
)
