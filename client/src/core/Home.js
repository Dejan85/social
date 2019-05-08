import React from 'react';

// components
import Posts from '../post/Posts';

const Home = () => {
  return (
    <>
      <div className='jumbotron'>
        <h2>Home</h2>
        <p className='lead'>Welcome to React Frontend</p>
      </div>

      <div className='container'>
        <Posts />
      </div>
    </>
  );
};

export default Home;
