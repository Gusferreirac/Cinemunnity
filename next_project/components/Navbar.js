import React from 'react';
import Navbar from './navbar'; // Assuming Navbar is correctly exported from './navbar'
import styles from '.navbar.module.css';

function Index() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light mt-2">
        <Navbar /> {/* Render the Navbar component */}
        <div className={styles.navlinks}> {/* Use className instead of class */}
          <a className={'${styles.navbarText} ${styles.marginRight}'}href="#">Sign In</a>
          <a className={'${styles.navbarText} ${styles.marginRight}'}href="#">Create Account</a>
          <a className={'${styles.navbarText} ${styles.marginRight}'}href="#">Films</a>
          <a className={'${styles.navbarText} ${styles.marginRight}'}href="#">News</a>
          {/* Add additional navigation items, logout links, etc. as needed */}
        </div>
        {/* Additional comments can be added like this */}
      </nav>
    </>
  );
}

export default Index;

