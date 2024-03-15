import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Room from './pages/ChatRoom';
import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp';
import { io } from 'socket.io-client';
import { useData } from './context/page';
import NotFound from './pages/404';
import RoomChat from './features/RoomChat';
import { useEffect, useRef, useState } from 'react';
import './index.css'

function App() {
  const { isAuthenticated } = useData();
  const socket = useRef(null);
  const [currentRoom,setCurentRoom] = useState(null)
  useEffect(() => {
    socket.current = io('http://localhost:5000', { transports: ['websocket'] });
  
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);
  
  return (
    <>
      <Router>
        <Routes>
            <Route index element={isAuthenticated ? <Navigate to="/room" /> : <Navigate to='/auth/signin' />} />
            <Route path="auth/signin" element={<SignIn />} />
            <Route path="auth/signup" element={<SignUp />} />
            {
              isAuthenticated && <Route path="/room" element={<Room socket={socket.current} currentRoom={currentRoom} setCurentRoom={setCurentRoom}/>}>
                {
              isAuthenticated && <Route path=":id" element={<RoomChat socket={socket.current} currentRoom={currentRoom} setCurentRoom={setCurentRoom}/>} />
            }
              </Route>
            }
            
            <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
