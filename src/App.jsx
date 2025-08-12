import './App.css'
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import ItemDetails from './components/ItemDetails/ItemDetails.jsx'
import itemForm from './components/itemForm/itemForm.jsx'
import ItemList from './components/itemList/itemList.jsx'
import { Route, Routes, useNavigate } from 'react-router-dom'
import * as authService from './services/authService.js'
import * as itemService from './services/itemService.js'
import { useState, useEffect  } from 'react'
import ItemList from './components/itemList/itemList.jsx'


const App = () => {

  const initialState = authService.getUser()

  const [user, setUser] = useState(initialState)
  const [items,setItems] = useState([])


useEffect(() => {
  const fetchAllItems = async () => {
    const itemsData = await itemService.index();
    console.log('itemsData:', itemsData);
  };
  if (user) fetchAllItems();
}, [user]);


  const handleSignUp = async (formData) => {
    try {
      const res = await authService.signUp(formData)
      setUser(res)
      // return success
      return { success: true }
    } catch(err){
      // return failure flag (then signup form can display message)
      // add message?
      return { success: false, message: err.message }
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const handleSignIn = async (formData) => {
    const res = await authService.signIn(formData)
    setUser(res)
  }



  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
          <Route path='/' element={<h1>Hello world!</h1>} />
          <Route path='/sign-up' element={<SignUp handleSignUp={handleSignUp} user={user} />} />
          <Route path='/sign-in' element={<SignIn handleSignIn={handleSignIn} user={user} />} />
<Route path="/item" element={<ItemList items={items} />} />
          <Route path='*' element={<h1>404</h1>} />
    </Routes>
    </>


  )
}

export default App


