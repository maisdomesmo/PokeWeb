import { Home } from "./Pages/Home"
import { Profile } from "./Pages/Profile";

import { Route, Routes, BrowserRouter } from "react-router-dom"; 

import './style/global.css'
import { AppProvider } from "./hooks";
import { useContext } from "react";
import {page} from './components/poke-card/index'
import './style/global.css'


function App() {
  const currentPage = useContext(page)

  return (
    <BrowserRouter>
                <AppProvider>
                  <Routes>
                      <Route path={`/:page`} element={<Home />} />
                      <Route path={`/profile/:content/:pokeName`} element={<Profile pokePage={currentPage!} />} />
                  </Routes>
                </AppProvider>
    </BrowserRouter>
  )
    
}

export default App
