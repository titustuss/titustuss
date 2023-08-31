import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage' 
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import { useState } from 'react'
import AccountPage from './pages/AccountPage'
import PlacesPage from './pages/PlacesPage'
import PlacesFormPage from './pages/PlacesFormPage'
import PlacePage from './pages/PlacePage'

axios.defaults.baseURL ="http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {

  const [category, setCategory] = useState("all");
  const [searchInput, setSearchInput] = useState("");

  const setCategoryValue = (value) =>{
    setCategory(value);
  }

  const setSearchInputValue = (value) =>{
    setSearchInput(value);
  }

  return (
     <UserContextProvider>
     <Routes>
      <Route path='/' element={<Layout category={category} setCategoryValue={setCategoryValue} searchInput={searchInput} setSearchInputValue={setSearchInputValue}/>}>
        <Route index element={ <IndexPage category={category} searchInput={searchInput}/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path='/account' element={<AccountPage/>}/>
        <Route path='/account/places' element={<PlacesPage/>}/>
        <Route path='/account/places/new' element={<PlacesFormPage/>}/>
        <Route path='/account/places/:id' element={<PlacesFormPage/>}/>
        <Route path='/place/:id' element={<PlacePage/>}/>
      </Route>
     </Routes>
     </UserContextProvider>
  )
}

export default App
