import Login from './components/Login'
import OnlineUsers from './components/OnlineUsers'
import ChatInterface from './components/ChatInterface'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

const App = () => {
  
  return (<>

    <nav className="navbar">
      <h1>Buck</h1>
    </nav>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/online' element={<OnlineUsers />} />
        <Route path='/chat' element={<ChatInterface />} />
      </Routes>
    </BrowserRouter>
  </>
  )


}


export default App