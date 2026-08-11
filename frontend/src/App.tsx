import Login from './components/Login'
import OnlineUsers from './components/OnlineUsers'
import ChatInterface from './components/ChatInterface'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

const App = () => {
  
  return (<>

    <nav className="navbar">
      <img src="../public/bakbak-logo.svg" alt="logo" style={{width: "300px", marginLeft: "30px"}} />
    </nav>
    <div className="parent">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/online' element={<OnlineUsers />} />
          <Route path='/chat' element={<ChatInterface />} />
        </Routes>
      </BrowserRouter>
    </div>
  </>
  )


}


export default App