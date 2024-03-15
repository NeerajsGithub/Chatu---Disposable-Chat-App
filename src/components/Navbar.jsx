import React from 'react'
import '../App.css'
import { useSelector } from 'react-redux'
import { useData } from '../context/page';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Navbar({ openModal , currentRoom , setCurentRoom }) {
  const { userName } = useSelector((state)=>state.user);
  const { isAuthenticated , setAuth } = useData();
  const navigate = useNavigate();

  const logout = () => {
       setAuth(false);
       navigate('/auth/signin')
       toast.success('Logged out successfully')
       setCurentRoom(null)
  }
  return (
    <div>
      <header class="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-0  sm:py-0">
        <nav class="relative max-w-[92rem] w-full mx-auto py-1 px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8" aria-label="Global">
          <div class="flex items-center justify-between">
            <div className='flex items-center justify-center flex-row gap-2 '>
              <img className='h-7 pr-[2px]' src='https://seeklogo.com/images/G/google-chat-logo-44A66F8CF0-seeklogo.com.png'/>
            <a class="flex-none text-2xl font-semibold" href="#" aria-label="Brand">Chatu</a>
            </div>
            <div class="sm:hidden">
              <button type="button" class="hs-collapse-toggle size-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none " data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
                <svg class="hs-collapse-open:hidden flex-shrink-0 size-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
                <svg class="hs-collapse-open:block flex-shrink-0 hidden size-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
          </div>
          <div id="navbar-collapse-with-animation" class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
            <div class="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
              <h2 className='text-md text-gray-600 cursor-pointer rounded-full'>Hey , {userName}</h2>
              <button onClick={()=>logout()} class="flex items-center gap-x-2 font-medium text-gray-500 hover:text-[#00917c] sm:border-s sm:border-gray-300 sm:my-6 sm:ps-6 " href="#">
                  <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Log Out
              </button>
            </div>
          </div>
        </nav>  
      </header>

        <nav class="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative flex flex-row justify-between items-center gap-x-8 border-t py-4 sm:py-0 ">
            <div class="flex items-center w-full sm:w-[auto]">
              <span class="font-semibold whitespace-nowrap text-gray-700 text-2xl border-e border-e-white/[.7] sm:border-transparent p-2 me-4 sm:py-3.5 ">My Rooms</span>
           

            </div>
            {
            currentRoom === null && 
              <>
            <div id="secondary-nav-toggle" class="hs-collapse hidden overflow-hidden transition-all duration-300 absolute top-16 end-0 w-full rounded-lg bg-white sm:block sm:static sm:top-0 sm:w-full sm:max-h-full sm:bg-transparent sm:overflow-visible">
              <div class="flex flex-col py-2 sm:flex-row sm:justify-end sm:gap-y-0 sm:gap-x-6 sm:py-0">
                <button  onClick={openModal} class="text-sm font-semibold text-[#00917c] py-2 sm:py-3.5" href="#"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 rounded-full bg-gray-50 hover:bg-gray-100 p-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg></button>
              </div>
            </div>
             </>
            }
          </div>
        </nav>
    </div>
  )
}
