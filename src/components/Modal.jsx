  import React, { useState } from 'react';
  import '../App.css';

  const Modal = ({ modalOpen, closeModal , roomName , Joinroom , setRoomName }) => {

    return (
      <>
      <div>
        
        {modalOpen && (
          <>
          <div class="fixed z-50 inset-0 bg-black bg-opacity-50"></div>
          <form  onSubmit={(e) => {
            e.preventDefault(); 
            Joinroom(roomName) 
          }}>
          <div  class="size-full fixed top-[25%] start-0 z-[80] overflow-x-hidden transition-all overflow-y-auto pointer-events-none">
          <div class="  transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
            <div class="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto ">
              <div class="flex justify-between items-center py-3 px-4 border-b ">
                <h3 class="font-bold text-gray-700 ">
                  Join Room 
                </h3>
                <button onClick={closeModal} type="button" class="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none  " data-hs-overlay="#hs-basic-modal">
                  <span class="sr-only">Close</span>
                  <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>
              <div class="p-4 overflow-y-auto">
              <input onChange={(e) => setRoomName(e.target.value)} class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="52332432"/>  
              </div>
              <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t ">
                <button  type='submit' class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#00917c] text-white disabled:opacity-50 disabled:pointer-events-none">
                  Join Room
                </button>
                  </div>
                
                </div>
              </div>
            </div>
          </form>
          </>
        )}
        </div>
      </>
    );
  };

  export default Modal;
