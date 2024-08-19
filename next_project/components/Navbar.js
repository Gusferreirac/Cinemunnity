import React from 'react';
import ButtonBlack from './ButtonBlack';

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
  return (
    <>
      <div className='h-16 w-full'>
        <nav className="absolute left-1/2 transform -translate-x-1/2">
          <div className='mt-4'> 
            <Link href='#' title='Sign In' />
            <Link href='#' title='Create Account' />
            <Link href='#' title='Films' />
            <Link href='#' title='News' />
          </div> 
          {/* Additional comments can be added like this */}
        </nav>
      </div>
    </>
  );
}

export default Navbar;

