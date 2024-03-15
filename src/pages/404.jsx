
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div class="fixed top-[25%] right-[25%] max-w-[50rem] flex flex-col mx-auto size-full">
      <div class="text-center py-10 px-4 sm:px-6 lg:px-8">
        <h1 class="block text-7xl font-bold text-gray-800 sm:text-9xl ">404</h1>
        <h1 class="block text-2xl font-bold text-white"></h1>
        <p class="mt-3 text-gray-600 ">Oops, something went wrong.</p>
        <p class="text-gray-600 ">Sorry, we couldn't find your page.</p>
        <div class="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
          <Link to="/auth/signin" class="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#00917c] text-white disabled:opacity-50 disabled:pointer-events-none " href="https://github.com/htmlstreamofficial/preline/tree/main/examples/html" >  
            Back to page  
          </Link>
        </div>
      </div>

      <footer class="mt-auto text-center py-5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p class="text-sm text-gray-500">© All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
