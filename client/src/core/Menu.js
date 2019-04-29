import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/signin">Signin</Link>
            <Link to="/signup">Signup</Link>
        </div>
    )
}

export default Menu;