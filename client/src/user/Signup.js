import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// methods
import { signup } from '../auth'

class Signup extends Component {
    constructor() {
        super()

        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false
        }
    };


    // handle input change
    handleChange = (name) => (e) => {
        this.setState({
            [name]: e.target.value
        });
    };

    // submit 
    clickSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = this.state;
        const user = {
            name, email, password
        };
        signup(user)
            .then((data) => {
                if (data.error) {
                    this.setState({
                        error: data.error
                    });
                } else {
                    this.setState({
                        error: "",
                        name: "",
                        email: "",
                        password: "",
                        open: true
                    });
                };
            });
    };

    signupForm = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input className="form-control" type="text" onChange={this.handleChange("name")} value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input className="form-control" type="text" onChange={this.handleChange("email")} value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input className="form-control" type="password" onChange={this.handleChange("password")} value={password} />
            </div>
            <button className="btn btn-raised btn-primary" onClick={this.clickSubmit}>Submit</button>
        </form>
    )


    render() {
        const { name, email, password, error, open } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                <div className="alert alert-info" style={{ display: open ? "" : "none" }}>
                    {/* {open} */}
                    New account is successfuly created. Please <Link to="/signin">Sign In.</Link>
                </div>
                {this.signupForm(name, email, password)}
            </div>
        )
    };
};

export default Signup;