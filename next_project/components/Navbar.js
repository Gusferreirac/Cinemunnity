import React from 'react';
import {useCookies} from 'next-client-cookies';

function Link({ href, title }) {
  return (
    <a 
      className='mr-8 text-gray-500 decoration-transparent hover:text-gray-800' 
      href={href}>
        {title}
    </a>
  );
}


function Navbar() {
  const userId = useCookies().get('userId');
  const name = useCookies().get('name');

  return (
    <>
    {userId ? 
      <div className='h-16 w-full flex'>
        <span className='ml-8 my-auto font-bold'>{name}</span>
        <nav className="absolute left-1/2 transform -translate-x-1/2 ">
          <div className='mt-4'> 
            <Link href='/feed' title='Feed' />
            <Link href='/community/list' title='Communities' />
            <Link href='/community/create' title='Create Community' />
            <Link href='/movies/list' title='Films' />
            <Link href={'/profile/' + userId} title='Profile' />
          </div> 
          {/* Additional comments can be added like this */}
        </nav>
      </div>
    :
      <div className='h-16 w-full'>
        <nav className="absolute left-1/2 transform -translate-x-1/2">
          <div className='mt-4'> 
            <Link href='/login' title='Sign In' />
            <Link href='/login' title='Create Account' />
            <Link href='#' title='Films' />
          </div> 
          {/* Additional comments can be added like this */}
        </nav>
      </div>
      }
    </>
  );
}

export default Navbar;

