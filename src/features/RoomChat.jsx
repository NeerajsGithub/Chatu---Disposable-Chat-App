    import React, { useEffect, useState } from 'react'
    import toast from 'react-hot-toast';
    import { useSelector } from 'react-redux';
    import { useNavigate } from 'react-router-dom';
    import '../App.css'


    export default function RoomChat({ socket , currentRoom , setCurentRoom }) {
        var sample = "";
        const { userName } = useSelector((state) => state.user);
        const navigate = useNavigate();
        const [messages, setMessages] = useState([]);
        const [inputMessage, setInputMessage] = useState('');

        const handleSendMessage = () => {
            if (socket) {
            socket.emit('chat message', `${userName}:${inputMessage}`);
            setInputMessage('');
            }
        };

        useEffect(() => {
          if (socket) {
            socket.off('chat message');
            socket.on('chat message', (message) => {
              const [username, content] = message.split(':');
              if (!messages.find((msg) => msg === message)) {
                setMessages((prevMessages) => [...prevMessages, message]);
              }
            });
          }
        }, [socket, messages]);

          const leaveRoom = () => {
            if (socket) {
              socket.emit('leave-room');
              navigate('/room');
              toast.success("Leaved room successfully")
              setCurentRoom(null)
            }
          };
          
          const Msgmap = (messages) => {
            return messages.map((message, index) => {
              let [usersame, inputMessage] = message.split(':');
              if(usersame === 'server') {
                return (
                  <>
                  <li key={index} className="text-center">
                  <div className="inline-block bg-gray-100 rounded-lg p-2 text-sm shadow-sm">
                    <p className="text-sm text-gray-800">{inputMessage}</p>
                  </div>
                </li>
                  </>
                )
              }
              else if (usersame === userName) {
                usersame = usersame.substring(0, 2);
                return (
                  <li key={index} className="flex ms-auto gap-x-2 sm:gap-x-4">
                    <div class="grow text-end space-y-3">
                      <div class="inline-block bg-[#00917c] rounded-2xl p-4 shadow-sm">
                        <p class="text-sm text-white">
                          {inputMessage}
                        </p>
                      </div>
                    </div>
                    <span class="flex-shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600">
                      <span class="text-sm font-medium text-white leading-none">{usersame}</span>
                    </span>
                  </li>
                );
              
              }
              else {
                usersame = usersame.substring(0, 2);
                return (
                  <li key={index} className="max-w-lg flex gap-x-2 sm:gap-x-4 me-11">
                    <span class="flex-shrink-0 inline-flex mt-2 items-center justify-center size-[38px] rounded-full bg-gray-600">
                        <span class="text-sm font-medium text-white leading-none">{usersame}</span>
                      </span>
                      <div class="bg-white border border-gray-200 rounded-2xl p-4 space-y-3  ">
                        <p class="text-sm text-gray-800 ">
                          {inputMessage}
                        </p>
                      </div>
                  </li>
                );
              }
            });
          };

    return (
        <form className='flex gap-4'>
         <ul class="space-y-5 w-[65rem] h-[27rem] p-9 bg-gray-50 rounded-xl overflow-y-auto scrollbar-hide">
        {!messages ? 'No messages sent' : Msgmap(messages)}
        </ul>
        <div className='fixed z-10 bottom-10 flex flex-row gap-4 right-[25%]'>
        <input type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)} id="input-label" class=" py-3 px-4 pr-[30rem] block w-full border border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none" placeholder="Enter message"></input>
        <button onClick={handleSendMessage} type="button" class="py-2 px-4 inline-flex items-center gap-x-2 text-md font-semibold rounded-lg border border-transparent bg-[#00917c] text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
          Send
        </button>
        <button  onClick={()=>leaveRoom()} type="button" class="py-2 bg-white px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none">
          Leave
        </button>
        </div>
    </form>
    )
    }

              // const Msgmap = (messages) => {
          //   messages.map((message)=>{
          //     const [usersame, inputMessage] = message.split(':');
          //     if(usersame === userName) {
          //       return (
          //         <>
          //           <li class="flex ms-auto gap-x-2 sm:gap-x-4">
          //           <div class="grow text-end space-y-3">
          //             <div class="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
          //               <p class="text-sm text-white">
          //                 {inputMessage}
          //               </p>
          //             </div>
          //           </div>
          //           <span class="flex-shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600">
          //             <span class="text-sm font-medium text-white leading-none">{userName}</span>
          //           </span>
          //         </li>
          //         </>
          //       )
          //     }
          //     else {
          //       return (
          //         <>
          //           <li class="max-w-lg flex gap-x-2 sm:gap-x-4 me-11 ">
          //             <span class="flex-shrink-0 inline-flex mt-2 items-center justify-center size-[38px] rounded-full bg-gray-600">
          //               <span class="text-sm font-medium text-white leading-none">{usersame}</span>
          //             </span>
          //             <div class="bg-white border border-gray-200 rounded-2xl p-4 space-y-3  ">
          //               <p class="text-sm text-gray-800 ">
          //                 {inputMessage}
          //               </p>
          //             </div>
          //           </li>
          //         </>
          //       )
          //     }
          //   })
          // }