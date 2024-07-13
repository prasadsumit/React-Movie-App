import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Component/HomePage/HomePage';
import Navbar from './Component/HomePage/Navbar';
import { AuthGuardFunction } from './Component/Auth/AuthGuardFunction';
import WatchList from './Component/HomePage/WatchList'
import RequireAuth from './Component/Auth/RequireAuth';
import { useState } from 'react';
import Login from './Component/HomePage/Login';
import Profile from './Component/Profile';
import Subscription from './Component/PaymentFlowComponent/Subscription';
import PaymentGate from './Component/PaymentFlowComponent/PaymentGate';
import VideoPlayer from './Component/VideoPlayer';


function App() {

  const [LoginModal , setLoginModal] = useState(false);

  let handleLoginToggle = ()=>{
    setLoginModal(!LoginModal)
  }
  
  return (
    <div>
      <AuthGuardFunction>
      <Navbar LoginModalState={{LoginModal, setLoginModal , handleLoginToggle}}/>
        <Routes>
          <Route path="/" element={<HomePage ></HomePage>}></Route>
          <Route path="/watchlist" element={
            <RequireAuth >
              <WatchList />
            </RequireAuth>
          }></Route>
          <Route path="/Subscription" element={
            <RequireAuth >
              <Subscription />
            </RequireAuth>
          }></Route>
          <Route path="/PaymentGate" element={
            <RequireAuth >
              <PaymentGate />
            </RequireAuth>
          }></Route>
          <Route path="/player" element={
            <RequireAuth >
              <VideoPlayer/>
            </RequireAuth>
          }></Route>
          <Route path="/Profile" element={
            <RequireAuth >
              <Profile/>
            </RequireAuth>
          }></Route>
          <Route path='/login' element={<Login LoginModalState={{LoginModal, setLoginModal , handleLoginToggle}}></Login>}></Route>
          
        </Routes>
        </AuthGuardFunction>
    </div>
  );
}

export default App;
