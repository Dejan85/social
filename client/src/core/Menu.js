import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#ff9900" };
    else return { color: "#ffffff" };

};

export const signout = (next) => {
    if (typeof window !== "undefined") localStorage.removeItem("jwt");
    next();
    return fetch("http://localhost:8080/signout", {
        method: "GET"
    })
        .then((res) => {
            console.log("signout", res);
            return res.json();
        })
        .catch((err) => {
            console.log(err);
        })
};

export const isAuthenticated = () => {
    if (typeof window == "undefined") return false;

    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};

const Menu = ({ history }) => {
    console.log(isAuthenticated());
    return (
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link className="nav-link" to="/" style={isActive(history, "/")}>Home</Link>
                </li>


                {!isAuthenticated() && (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signin" style={isActive(history, "/signin")}>Signin</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup" style={isActive(history, "/signup")}>Signup</Link>
                        </li>
                    </>
                )}

                {isAuthenticated() && (
                    <>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="#"
                                style={isActive(history, "/signout")}
                                onClick={() => signout(() => {
                                    history.push('/')
                                })}
                            >Signout</Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    )
}

export default withRouter(Menu);


