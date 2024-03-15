  import React, { useCallback, useEffect, useState } from 'react';
  import Navbar from '../components/Navbar';
  import Modal from '../components/Modal';
  import { useSelector } from 'react-redux';
  import toast from 'react-hot-toast';
  import { Outlet, useNavigate, useOutlet } from 'react-router-dom';

  export default function Room({ socket , currentRoom , setCurentRoom }) {
    const [rooms, setRooms] = useState([]); 
    const navigate = useNavigate();
    const outlet = useOutlet();
    const [modalOpen, setModalOpen] = useState(false);
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { userName } = useSelector((state) => state.user);
    const [roomName, setRoomName] = useState(null)
    var a = 0


    const closeModal  = useCallback(() => {
      setModalOpen(false);
    }, [setModalOpen]);

    const JoinRoom = useCallback(async (roomName) => {
      if (roomName === undefined) {
        toast.error("Empty room name");
      } else {
        setCurentRoom(roomName)
        await socket.emit('joinroom', roomName, userName);
        setMessages([]);
        toast.success(`Room ${roomName} is joined`);
        navigate(`/room/${roomName}`);
  
        if (!rooms.includes(roomName)) {
          setRooms((prevRooms) => [...prevRooms, roomName]);
        }
    
        closeModal();
      }
    }, [navigate, setMessages, setRooms, socket, userName, closeModal, rooms]);
    
    const openModal = useCallback(() => {
      setModalOpen(true);
    }, [setModalOpen]);


    return (
      <div className=''>
        <Navbar openModal={openModal} currentRoom={currentRoom} setCurentRoom={setCurentRoom} />
        <Modal Joinroom={JoinRoom} roomName={roomName} closeModal={closeModal} openModal={openModal} modalOpen={modalOpen} setRoomName={setRoomName} />
        
        <div className='rounded-xl items-center mx-[2.7rem] p-5'>
          {outlet ? null : (
          <ul className=''>
            {
            rooms.length === 0 ? <li onClick={()=>openModal(true)} className='my-4 items-center justify-center flex  rounded-xl p-4 py-8 cursor-pointer'>No rooms exists <br></br><a className='pl-1 text-[#00917c]'>Click to create one</a></li> 
            :
            rooms.map((element, index) => (
              <li className='my-4 font-semibold bg-gray-100 rounded-xl text-xl text-gray-700 px-8 py-8 cursor-pointer' onClick={() => JoinRoom(element)} key={index}>
                 #{index} Room-<span
                 className='text-semibold text-xl '>
                  {element}
                  </span>
              </li>
            ))            
            }
          </ul>
        )}
        </div>
        <div className='flex items-center justify-center'>
        <Outlet />
        </div>
      </div>
    );
  }
